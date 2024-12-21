export const getObjectById = (id, data) => {
  // Tìm phim có ID khớp với ID yêu cầu
  return data?.find((element) => element.id === id);
};

export const getFavoriteMovieById = (id, data) => {
  // Tìm phim có ID khớp với ID yêu cầu
  return data?.find((element) => element.movieID === id);
};

export const getMovieWatchedById = (id, data) => {
  // Tìm phim có ID khớp với ID yêu cầu
  return data?.filter((element) => element.movieID === id);
};
 
export const getMoviesRents = (plans, movies, count) => {

  // Lọc các phim có planid tương ứng và có lever > 3
  const filteredMovies = movies?.filter(movie => getObjectById(movie.planID, plans)?.lever === count);

  return filteredMovies; // Trả về danh sách phim đã lọc
};

export const getPeatureRents = (plans, peatures, count) => {

  // Lọc peature có planid tương ứng và có lever > 3
  const filteredPeatures = peatures?.filter(peature => getObjectById(peature.planID, plans)?.lever === count);

  return filteredPeatures; // Trả về danh sách phim đã lọc
};
export const getAllObjectById = (id, data) => {
  // Lọc tất cả phần tử có ID khớp với ID yêu cầu
  return data?.filter((element) => element.planID === id);
};
export const getEpisodeById = (id, episodes) => {
  // Kiểm tra nếu episodes là một mảng hợp lệ, sau đó tìm phần tử
  if (!Array.isArray(episodes)) return null;
  return episodes.find((episode) => episode.idMovie === id) || null;
};





