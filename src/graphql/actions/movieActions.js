import Movie from '../../models/Movie';

export default {
  getMovies: () => Movie.find(),
  getMovieById: (_id) => Movie.findById(_id),
  getMovieByTitle: (title) => Movie.findOne({ title }),
  addNewMovie: async (body) => {
    const newMovie = new Movie(body);
    await newMovie.save();
    return newMovie;
  },
  updateMovie: (_id, body) => Movie.findByIdAndUpdate(_id, body, { new: true }),
  deleteMovie: (_id) => Movie.findByIdAndDelete(_id),

};
