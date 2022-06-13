class MoviesService {
    _apiBase = 'https://api.themoviedb.org/3/';

    _apiKey = 'api_key=4c9e8b931bd05b0b72227abd9c8571cf';
    _baseOffset = 10;
    _baseLimit = 10;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllMovies = async (offset = this._baseOffset) => {

        let arrPages = [];
        for(let i= offset - this._baseLimit; i < offset; i++){
            const res = await this.getResource(`${this._apiBase}discover/movie?${this._apiKey}&page=${i+1}`);
            arrPages.push(res);
        }

        return arrPages;
        //return res.data.results.map(this._transformCharacter);
    }

    getSearchMovie = async (term) => {

        const res = await this.getResource(`${this._apiBase}search/movie?${this._apiKey}&query=${term}`);

        return res;

    }

    getMovie = async (id) => {
        const res = await this.getResource(`${this._apiBase}movie/${id}?${this._apiKey}`);

console.log(res);
        return res;

    }

    // getCharacter = async (id) => {
    //     const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    //     return this._transformCharacter(res.data.results[0]);
    // }

    // _transformCharacter = (char) => {
    //     return {
    //         id: char.id,
    //         name: char.name,
    //         description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
    //         thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
    //         homepage: char.urls[0].url,
    //         wiki: char.urls[1].url,
    //         comics: char.comics.items
    //     }
    // }
}

export default MoviesService;