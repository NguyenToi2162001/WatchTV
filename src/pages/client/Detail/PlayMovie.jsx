import React, { useContext } from 'react';
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { ContextEpisodes } from "../../../context/EpisodesProvider"
function PlayMovie(props) {
    const episodes = useContext(ContextEpisodes);
    const firstEpisode = episodes && episodes.length > 0 ? episodes[0] : null;
    const addcoment = () => {
        console.log(firstEpisode);
    }
    return (
        <div >
            <div className='h-screen'>
                <iframe
                    src={firstEpisode.episodeURL}
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
                        <div className='mt-7'>
                            <input className='w-11/12 h-28 rounded-xl' type="text" />
                        </div>
                        <div className='mt-4'>
                            <button onClick={addcoment} className='bg-blue-800  px-2 py-2 rounded-md text-white hover:bg-cyan-600 text-sm' > Add Comment</button>
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