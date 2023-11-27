import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setArticles } from '../../redux/actions/articleActions';
// import { getArticles } from '../../services/api';
import axios from 'axios';

const ArticleList = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.article.articles);

  useEffect(() => {
    fetchArticles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchArticles = async () => {
    try {
      // Make a request to get all articles
      const response = await axios.get('http://localhost:3000/api/articles');
      console.log(response);

      // Dispatch the articles to the Redux store
      dispatch(setArticles(response.articles));
    } catch (error) {
      console.error('Error fetching articles: ', error.response.data);
    }
  };

  return (
    <div>
      <h2>Article List</h2>
      {JSON.stringify(articles)}
      {articles.length > 0 ? (
        <ul>
          {articles.map((article) => (
            <li key={article._id}>
              <h3>{article.title}</h3>
              <p>{article.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles available.</p>
      )}
    </div>
  );
};

export default ArticleList;
