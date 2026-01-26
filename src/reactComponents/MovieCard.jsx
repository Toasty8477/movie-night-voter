const MovieCard = (props) => {
    return(
        <div className="card">
            <div className="card-content">
                <p className="title">
                    {props.title}
                </p>
                <p>
                    {props.description}
                </p>
            </div>
            <footer className="card-footer">
                <a href="#" className="card-footer-item">Like</a>
                <a href="#" className="card-footer-item">Dislike</a>
            </footer>
        </div>
    )
}

export default MovieCard