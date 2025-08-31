import Header from './Header'
import usePopularMovies from '../hooks/usePopularMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'



function Browse() {
    usePopularMovies()

    return (
        <div className='bg-black'>
            <Header />
            <MainContainer />
            <SecondaryContainer />

        </div >
    )
}

export default Browse
