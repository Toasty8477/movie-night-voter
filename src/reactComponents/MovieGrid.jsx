import MovieCard from "./MovieCard"

const MovieGrid = (props) => {
    return(
        <div className="fixed-grid has-3-cols has-1-cols-mobile">
            <div className="grid">
                <MovieCard title="Title" description="foobar" />
                <MovieCard title="Title" description="foobar" />
                <MovieCard title="Title" description="foobar" />
                <MovieCard title="Title" description="foobar" />
            </div>
        </div>
    )
}

export default MovieGrid