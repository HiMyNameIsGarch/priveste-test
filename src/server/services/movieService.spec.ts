import { describe, expect, test } from 'vitest';
import { IMovie } from '~/interfaces/IMovie';

import * as MovieService from './movieService';

describe('Movie Service', () => {
    const ms = MovieService;
    let movie: IMovie;
    let nullMovie: IMovie;

    beforeEach(() => {
        movie = {} as IMovie;
        movie.name = 'The Fallout';
        nullMovie = null as unknown as IMovie;
    });

    // GetAll method
    test('it should get all the movies', async () => {
        const one = await ms.add(movie);
        const data = await ms.getAll();
        expect(data.length > 0).toBeTruthy();
        await ms.del(one.id);
    });

    // Add method
    test('it should add a new movie succesfully', async () => {
        const res = await ms.add(movie);
        expect(res.id.length > 5).toBeTruthy();
        await ms.del(res.id);
    });

    test('it should throw parameter post is null', async () => {
        try {
            await ms.add(nullMovie);
        } catch (err) {
            expect((err as Error).message).toContain('Movie is undefined');
        }
    });

    test('it should throw error, movie is not new', async () => {
        const first = await ms.add(movie);
        try {
            await ms.add(first);
        } catch (err) {
            expect((err as Error).message).toContain('Movie is not new');
        }
        await ms.del(first.id);
    });

    // Update method
    test('it should update a movie succesfully', async () => {
        const newMovie = await ms.add(movie);
        const newName = 'The New Fallout';
        newMovie.name = newName;
        const testMovie = await ms.update(newMovie);
        expect(testMovie.name === newName).toBeTruthy();
        await ms.del(newMovie.id);
    });
    test('it should throw error, movie is undefined', async () => {
        try {
            await ms.update(nullMovie);
        } catch (err) {
            expect((err as Error).message).toContain('Movie is undefined');
        }
    });
    test('it should throw error, id is undefined', async () => {
        try {
            movie.id = undefined!;
            await ms.update(movie);
        } catch (err) {
            expect((err as Error).message).toContain('Invalid movie id');
        }
    });
    test('it should throw error, movie does not exist', async () => {
        try {
            movie.id = 'invalid id';
            await ms.update(movie);
        } catch (err) {
            expect((err as Error).message).toContain('Movie does not exist');
        }
    });

    // Delete method
    test('it should delete a movie succesfully', async () => {
        movie = await ms.add(movie);
        const firstCount = (await ms.getAll()).length;
        await ms.del(movie.id);
        const secondCount = (await ms.getAll()).length;
        expect(firstCount - 1 === secondCount).toBeTruthy();
    });
    test('it should throw error, id is undefined', async () => {
        try {
            await ms.del(undefined!);
        } catch (err) {
            expect((err as Error).message).toContain('Invalid movie id');
        }
    });
    test('it should throw error, movie does not exist', async () => {
        try {
            await ms.del('invalid id');
        } catch (err) {
            expect((err as Error).message).toContain('Movie does not exist');
        }
    });
});
