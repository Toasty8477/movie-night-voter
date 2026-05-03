import MovieCard from "./MovieCard"
import { useEffect } from "react"

const MovieGrid = (props) => {

    useEffect(() => {
        fetch("http://localhost:3000")
        .then()
    }, [])

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