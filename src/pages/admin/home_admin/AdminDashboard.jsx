import React from 'react';
import Menu from './Menu';
import Main from './Main';

function AdminDashboard(props) {

    return (
        <div className='md:flex md:h-screen'>
              <Menu/>
              <Main/>
        </div>
    );
}
export default AdminDashboard;