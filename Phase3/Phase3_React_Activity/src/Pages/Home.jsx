import Mainpart from "../components/Mainpart";
import Category from "../components/Category";
import PageTransition from "../transitions/PageTransition";
const Home = () => {
  return (
    <PageTransition>    <>
  <Mainpart />
  <Category/>
    </>
  </PageTransition>
  );
};

export default Home;
