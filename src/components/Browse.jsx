import Header from './Header'
import useFetchMovies from '../hooks/useFetchMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'



function Browse() {
    useFetchMovies('popular')
    useFetchMovies('upcoming')
    useFetchMovies('top_rated')

    return (
        <div className='bg-black'>
            <Header />
            <MainContainer />
            <SecondaryContainer />

        </div >
    )
}

export default Browse
