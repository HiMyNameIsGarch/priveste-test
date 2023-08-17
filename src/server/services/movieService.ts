import { IMovie } from '~/interfaces/IMovie';

import { movies } from '../utils/firebase';

const getAll = async (): Promise<Array<IMovie>> => {
    try {
        const data = await movies.get();
        const movieList: Array<IMovie> = [];
        data.forEach((doc: any) => movieList.push(doc.data() as IMovie));
        return movieList;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const add = async (movie: IMovie): Promise<IMovie> => {
    try {
        if (movie === undefined || movie === null) {
            throw new Error('Movie is undefined');
        }
        if (movie.id !== undefined) {
            throw new Error('Movie is not new');
        }
        const newId = movies.doc();
        movie.id = newId.id;
        const res = await movies.doc(newId.id).set(movie);
        if (res) return movie;
        return {} as IMovie;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const del = async (movieId: string): Promise<boolean> => {
    try {
        if (movieId === undefined) {
            throw new Error('Movie Id is undefined');
        }
        const docMovie = movies.doc(movieId);
        const movie = await docMovie.get();
        if (!movie.exists) {
            throw new Error('Movie does not exists on deleting method');
        }
        const res = await docMovie.delete();
        console.log(res);
        return true;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const update = async (movie: IMovie): Promise<IMovie> => {
    try {
        if (movie === undefined || movie === null) {
            throw new Error('Invalid movie on update method');
        }
        if (movie.id === undefined) {
            throw new Error('Invalid movie id on update method');
        }
        const docMovie = movies.doc(movie.id);
        const dbMovie = await docMovie.get();
        if (!dbMovie.exists) {
            throw new Error('Movie does not exist on update method');
        }
        const res = await docMovie.update({ name: movie.name });
        if (res) return movie;
        return {} as IMovie;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export { getAll, add, del, update };
