import FeaturedClubs from "./FeaturedClubs/FeaturedClubs";
import HeroSection from "./HeroSection/HeroSection";
import HowItWorks from "./HowItWorks/HowItWorks";
import PopularCategories from "./PopularCategories/PopularCategories";


const Home = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <HeroSection></HeroSection>
            <FeaturedClubs></FeaturedClubs>
            <HowItWorks></HowItWorks>
            <PopularCategories></PopularCategories>
        </div>
    );
};

export default Home;