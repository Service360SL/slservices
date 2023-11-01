import React from 'react';
import CreateBlogForm from './CreateBlogForm';
import '../../../../style/ServiceProvider/CreateABlog.css'

function Index() {
    return (
        <div className="index-container ms-lg-4 me-lg-5 p-sm-5 p-3 border rounded">
            <CreateBlogForm />
        </div>
    );
}

export default Index;