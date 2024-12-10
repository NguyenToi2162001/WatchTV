// src/services/firebaseService.js
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, onSnapshot, query, where, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";
import { uploadImageToCloudinary, deleteImageFromCloudinary } from '../config/cloudiaryConfig';

// Thêm tài liệu mới vào một bộ sưu tập cụ thể với tùy chọn tải lên hình ảnh
export const addDocument = async (collectionName, values) => {
  try {
    // Nếu có ảnh, upload ảnh lên Cloudinary và cập nhật URL ảnh vào values
    if (values.imgUrl) {
      const imgUrl = await uploadImageToCloudinary(values.imgUrl, collectionName);
      values.imgUrl = imgUrl;
    }

    // Thêm tài liệu vào bộ sưu tập
    const docRef = await addDoc(collection(db, collectionName), values);

    // Lấy tài liệu đã thêm (bao gồm ID của tài liệu)
    const addedDoc = await getDoc(doc(db, collectionName, docRef.id));
    
    // Trả về tài liệu đã thêm, bao gồm ID và các trường dữ liệu
    return { id: docRef.id, ...addedDoc.data() };

  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};
  

  export const fetchDocumentsRealtime = (collectionName, callback) => {
    const collectionRef = collection(db, collectionName);
  
    // Lắng nghe dữ liệu thay đổi trong thời gian thực
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
  
      // Gọi callback với dữ liệu mới nhất
      callback(documents);
    });
  
    // Hàm trả về unsubscribe để có thể dừng lắng nghe khi không cần nữa
    return unsubscribe;
  };
  // Delete a document from a given collection and its associated image

export const deleteDocument = async (collectionName, docId, imgUrl) => {
  // Xóa ảnh trên Cloudinary nếu tồn tại
  if (imgUrl && imgUrl.includes('cloudinary.com')) {
    // Lấy `public_id` từ URL của Cloudinary
    const publicId = imgUrl
      .split('/').slice(-2).join('/')  // Lấy thư mục và tên file từ URL
      .replace(/\.[^/.]+$/, '');       // Loại bỏ phần mở rộng file (ví dụ: .jpg, .png)
    await deleteImageFromCloudinary(publicId);
  }
// Xóa tài liệu khỏi Firestore
await deleteDoc(doc(collection(db, collectionName), docId));
};
export const updateDocument = async (collectionName, values, imgUpload, oldImgUrl) => {
   // Tách id ra khỏi newValues
   const { id, ...updatedValues } = values;
  if (imgUpload) {
    const storageRef = ref(storage, `${collectionName}/${uuidv4()}`);
    await uploadBytes(storageRef, imgUpload);
    const imgUrl = await getDownloadURL(storageRef);
    values.imgUrl = imgUrl;

    // Delete the old image if it exists
    if (oldImgUrl) {
      const oldFilename = oldImgUrl.split('%2F').pop().split('?').shift();
      const oldImgRef = ref(storage, `${collectionName}/${oldFilename}`);
      await deleteObject(oldImgRef);
    }
  }
  await updateDoc(doc(collection(db, collectionName), values.id), updatedValues);
};

