const url = "https://jsonplaceholder.typicode.com/posts/";

const findPostById = async (id) => {
    try {
        const res = await fetch(url + id);
        const post = await res.json();

        console.log(post);
    } catch (error) {
        console.log(error);
    }
};

findPostById(50);
