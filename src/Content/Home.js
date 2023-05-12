import ContentCard from '../Layout/ContentCard';
import Carousels from '../Layout/Carousels';
import Cards from '../Layout/Cards';

const Home = () => {
    return ( 
        <div>
            <section>
                <Carousels />
            </section>
            <section>
                <Cards />
            </section>
            <section className='container'>
                <ContentCard />
            </section>
        </div>
     );
}
 
export default Home;