import Header from "./Header"
import MovieGrid from "./MovieGrid"

const App = (props) => {
    return(
        <div className="container">
            <div>
                <Header />
            </div>
            <div>
                <MovieGrid />
            </div>
        </div>
    )
}

export default App