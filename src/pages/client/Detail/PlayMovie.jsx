import React, { useContext, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useAuth } from '../../../context/AuthsProvider';
import { ContextEpisodes } from "../../../context/EpisodesProvider"
import { useParams } from 'react-router-dom';
import { getEpisodeById } from "../../../services/ResponsitoryService";
import { addDocument } from '../../../services/FirebaseService';
import { useNotification } from "../../../context/NotificationProvider";
import { ContextComments } from '../../../context/CommentsProvider';
import { TextField } from '@mui/material';
import { getAllCommentById, getObjectById } from '../../../services/ResponsitoryService';
import { ContextSignUps } from "../../../context/SignUpProvider";
function PlayMovie(props) {
    const episodes = useContext(ContextEpisodes);
    const showNotification = useNotification();
    const { id } = useParams();
    const { user } = useAuth();
    const comments = useContext(ContextComments);
    const accounts = useContext(ContextSignUps);

    const inner = {
        content: "",
        acountId: "",
        movieID: "",
        time: ""
    }
    const [comment, setComment] = useState(inner);
    const addComment = async () => {
        await addDocument("Comments", comment);
        showNotification('Comment add successfully!', "success");

        setTimeout(() => {
            window.location.reload();
        }, 1000); // 1000ms = 1 giây

    }
    // const isComment = comments.some(comment => comment.movieID === id);

    const listComment = getAllCommentById(id, comments);
    const sortedComments = [...listComment].sort((a, b) => new Date(b.time) - new Date(a.time)); // Sắp xếp giảm dần (mới nhất trước)


    const handleInput = (event) => {
        const { value } = event.target;
        setComment({
            content: value,
            acountId: user.id,
            movieID: id,
            time: new Date().toISOString()
        });
    };



    return (
        <div >
            <div className='h-screen'>
                <iframe
                    src={getEpisodeById(id, episodes)?.episodeURL}
                    className="w-full h-full"
                    style={{ border: 'none' }}
                    allowFullScreen
                    title="Episode Video"
                />

            </div>
            <div className=' bg-gray-950 p-8 gap-5'>
                <button className='bg-red-800  px-3 py-2 rounded-md text-white text-sm' > Full HD </button>
                <div className=' grid grid-cols-1 lg:grid-cols-2'>
                    <div>
                        <div className='mt-7  w-96'>
                            <TextField
                                name="comment"
                                variant="outlined"
                                className="bg-gray-50 rounded-md"
                                InputProps={{
                                    style: { borderRadius: "8px" },
                                }}
                                onChange={handleInput}
                                fullWidth
                            />
                        </div>
                        <div className='mt-4'>
                            <button onClick={addComment} className='bg-blue-800  px-2 py-2 rounded-md text-white hover:bg-cyan-600 text-sm' > Add Comment</button>
                        </div>
                        <div className='flex items-center text-yellow-300 mt-7'>
                            <FaStar />
                            <p className='ms-3'>TOP COMMENT</p>
                        </div>
                        <div>
                            {sortedComments.map((comment, index) => (
                                <div
                                    key={index} className='mt-3 bg-gray-500 p-4 w-96 rounded-lg'
                                >
                                    <p className='text-black font-bold'>{getObjectById(comment?.acountId, accounts)?.username}</p>
                                    <p className='text-white '>{comment.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center text-yellow-300 mt-7'>
                            <FaStar />
                            <p className='ms-3'>TOP BẢNG XẾP HẠNG</p>
                        </div>
                        <div className='flex justify-between mt-3 items-center'>
                            <div className='mt-2 flex items-center'>
                                <img className='w-14 h-14 rounded-lg' src="https://i.ytimg.com/vi/_sJ0rRhTK84/maxresdefault.jpg" alt="" />
                                <div className='text-white ms-3 '>
                                    <p className='font-bold'>Gặp Lại Chị Bầu</p>
                                    <p className='text-xs'>"Gặp Lại Chị Bầu" là một bộ phim điện ảnh ...</p>
                                    <div className='flex items-center text-xs'>
                                        <FaRegHeart />
                                        <p className='ms-2'> 0 Lượt Thích</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className='bg-red-600 text-white font-bold py-2 px-4 text-xs  rounded-full'>99+</button>
                            </div>
                        </div>
                        <hr className='mt-4' />
                        <div className='flex justify-between mt-3 items-center'>
                            <div className='mt-2 flex items-center'>
                                <img className='w-14 h-14 rounded-lg' src="https://i.ytimg.com/vi/_sJ0rRhTK84/maxresdefault.jpg" alt="" />
                                <div className='text-white ms-3 '>
                                    <p className='font-bold'>Gặp Lại Chị Bầu</p>
                                    <p className='text-xs'>"Gặp Lại Chị Bầu" là một bộ phim điện ảnh ...</p>
                                    <div className='flex items-center text-xs'>
                                        <FaRegHeart />
                                        <p className='ms-2'> 0 Lượt Thích</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className='bg-red-600 text-white font-bold py-2 px-4 text-xs  rounded-full'>99+</button>
                            </div>
                        </div>
                        <hr className='mt-4' />
                        <div className='flex justify-between mt-3 items-center'>
                            <div className='mt-2 flex items-center'>
                                <img className='w-14 h-14 rounded-lg' src="https://aeonmall-review-rikkei.cdn.vccloud.vn/public/wp/16/news/MTULPAHbj8havgw8t7zvo4KgSFsnqUqSmr0luYiN.jpg" alt="" />
                                <div className='text-white ms-3 '>
                                    <p className='font-bold'>Venom Kèo Cuối</p>
                                    <p className='text-xs'>"Venom Kèo Cuối" là một bộ phim điện ảnh ...</p>
                                    <div className='flex items-center text-xs'>
                                        <FaRegHeart />
                                        <p className='ms-2'> 0 Lượt Thích</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className='bg-red-600 text-white font-bold py-2 px-4 text-xs  rounded-full'>99+</button>
                            </div>
                        </div>
                        <hr className='mt-4' />
                        <div className='flex justify-between mt-3 items-center'>
                            <div className='mt-2 flex items-center'>
                                <img className='w-14 h-14 rounded-lg' src="https://i.ytimg.com/vi/_sJ0rRhTK84/maxresdefault.jpg" alt="" />
                                <div className='text-white ms-3 '>
                                    <p className='font-bold'>Gặp Lại Chị Bầu</p>
                                    <p className='text-xs'>"Gặp Lại Chị Bầu" là một bộ phim điện ảnh ...</p>
                                    <div className='flex items-center text-xs'>
                                        <FaRegHeart />
                                        <p className='ms-2'> 0 Lượt Thích</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className='bg-red-600 text-white font-bold py-2 px-4 text-xs  rounded-full'>99+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayMovie;