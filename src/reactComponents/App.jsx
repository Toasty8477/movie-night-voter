import Header from "./Header"
import MovieGrid from "./MovieGrid"

const App = () => {
    return(
        <div className="container">
            <div>
                <Header />
            </div>
            <div>
                <MovieGrid moviesUrl = "http://localhost:3000" />
            </div>
        </div>
    )
}

export default App