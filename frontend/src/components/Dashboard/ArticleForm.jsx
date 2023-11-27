import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setArticles } from '../../redux/actions/articleActions';
// import { createArticle } from '../../services/api';
import axios from 'axios';

const ArticleForm = () => {
  const dispatch = useDispatch();
  const [articleData, setArticleData] = useState({ title: '', content: '' });

  const handleInputChange = (e) => {
    setArticleData({ ...articleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to create a new article
      const response = await axios.post('http://localhost:3000/api/articles/create', articleData);
      console.log("HAMED",response);

      // Dispatch the updated articles to the Redux store
      dispatch(setArticles(response.articles));

      // Clear the form after successful article creation
      setArticleData({ title: '', content: '' });
    } catch (error) {
      console.error('Error creating article: ', error.response.data);
    }
  };

  return (
    <div>
      <h2>Create Article</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={articleData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Content:
          <textarea
            name="content"
            value={articleData.content}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <button type="submit">Create Article</button>
      </form>
    </div>
  );
};

export default ArticleForm;
