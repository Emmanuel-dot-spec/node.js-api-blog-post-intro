const express = require('express');

const app = express();

app.use(express.json())

const PORT = 7007;

const blogPosts = []
    // GET, POST, PUT, DELETE
app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`)
})

app.get('/academy/blogPosts', (req, res, next) => {
    res.status(200).json({
        status: 'success',
        code: 200,
        data: blogPosts
    })
})

app.post('/academy/blogPosts', (req, res, next) => {

    const { author } = req.body

    const blogPostExist = blogPosts.find((element) => element.author === author);
    if (blogPostExist) {
        return res.status(409).json({
            status: 'error',
            message: 'BlogPost already exist',
            code: 409,
            data: null
        })
    }

    blogPosts.push(req.body)

    return res.status(201).json({
        status: 'success',
        message: 'BlogPost inserted successfully',
        code: 201,
        data: blogPosts
    })
})

app.put('/academy/blogPosts/:id', (req, res, next) => {
    const { id } = req.params;
    const { post, url, title, author } = req.body
    const blogPostIndex = blogPosts.findIndex((element) => element.id === id)
    if (blogPostIndex >= 0) {
        blogPosts[blogPostIndex] = {
            ...blogPosts[blogPostIndex],
            post,
            url,
            title,
            author
        }

        return res.status(200).json({
            status: 'success',
            message: 'BlogPost updated successfully',
            code: 200,
            data: blogPosts
        })
    }

    return res.status(400).json({
        status: 'error',
        message: 'BlogPost not found',
        code: 400,
        data: null
    })

})


app.delete('/academy/blogPosts/:id', (req, res, next) => {
    const { id } = req.params;
    const blogPostIndex = blogPosts.findIndex((element) => element.id === id)
    if (blogPostIndex >= 0) {
        blogPosts.splice(blogPostIndex, 1);
        return res.status(200).json({
            status: 'success',
            message: 'BlogPost deleted successfully',
            code: 200,
            data: blogPosts
        })
    }

    return res.status(400).json({
        status: 'error',
        message: 'BlogPost not found',
        code: 400,
        data: null
    })


})