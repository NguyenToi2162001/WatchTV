import React from 'react';
import Header from '../Navbar/Header';
import Footer from '../Footer/Footer';
import ClientRouters from '../../../routes/ClientRouters';
function Home(props) {
    return (
          <>
           <Header/>         
            <ClientRouters/>
           <Footer/>
           
          </>
    );
}

export default Home;