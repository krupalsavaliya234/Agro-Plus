import { Link, useNavigate } from 'react-router-dom';
import './styles/header.css'
import categories from './CategoriesList';


function Categories(props) {

    const navigate = useNavigate();

    
    return (
        <div className='cat-main'>

        <div className='cat-container'>
            <div>
                <span className='cats pr-3'>All Categories</span>
                {categories && categories.length > 0 &&
                    categories.map((item, index) => {
                        return (
                            <span onClick={() => navigate('/category/' + item)} key={index} className='category'> {item} </span>
                        )
                    })}
            </div>
        </div>
        </div>
    )
}

export default Categories;