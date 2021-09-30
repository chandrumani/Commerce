import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/product';
import LoadingBox from '../components/loadingbox';
import MessageBox from '../components/messagebox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector( state => state.productList);
    const { loading, error, products } = productList;

    const productuserTopSellersList = useSelector( state => state.userTopSellersList);
    const { loading: loadingSeller, error: errorSeller, users: sellers } = productuserTopSellersList;
    useEffect(() => {
        dispatch(listProducts({}));
        dispatch(listTopSellers());
    }, [dispatch]);
    return (
        <div>
            <h2>Top Sellers</h2>
            { loadingSeller ? (
                <LoadingBox></LoadingBox>
            ) :
            errorSeller ? (<MessageBox variant="danger">{errorSeller}</MessageBox>
                ) : (
                    <>
                   {sellers.length === 0 && <MessageBox>No Seller found</MessageBox>}
                   <Carousel showArrowa autoPlay showThumbs={false}>
                       {sellers.map((seller) => (
                           <div key={seller._id}>
                               <Link to={`seller/${seller._id}`}>
                                   <img src={seller.seller.logo} alt={seller.seller.name} />
                                   <p className="legend">{seller.seller.name}</p>
                               </Link>
                           </div>
                       ))}
                   </Carousel>
                   </>
            )
            }
            <h2>Featured Products</h2>
            { loading ? (
                <LoadingBox></LoadingBox>
            ) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                    {products.length === 0 && <MessageBox>No products found</MessageBox>}   
                        <div className=" row center">
                            {products.map((product) => (
                            <Product key={product._id} product={product}></Product>
                        ))}
                        </div>
                    </>
                )}
        </div>
    )
}