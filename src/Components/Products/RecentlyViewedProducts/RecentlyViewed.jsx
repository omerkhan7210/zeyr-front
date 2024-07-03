import React, { useContext } from 'react'
import { ProductFetchContext } from '../../Context/ProductFetch'
import { RVProducts } from './RVProducts'

export const RecentlyViewed = () => {
    const {menProducts} = useContext(ProductFetchContext)
    return (
        <section id="shopify-section-template--14940997058625__recently-viewed-products" className="shopify-section section section-recently-viewed-products"><link href="//amiri.com/cdn/shop/t/300/assets/product-card.css?v=4711510058172356091697846283" rel="stylesheet" type="text/css" media="all" />
            <style data-shopify dangerouslySetInnerHTML={{ __html: "#shopify-section-template--14940997058625__recently-viewed-products .section-padding {\n    padding-top: 60px;\n    padding-bottom: 60px;\n    border-top: 1px solid var(--color-border);\n  }\n\n  @media screen and (min-width: 769px) {\n    #shopify-section-template--14940997058625__recently-viewed-products .section-padding {\n      padding-top: 120px;\n      padding-bottom: 120px;\n    }     \n  }" }} />
            <recently-viewed-products className="recently-viewed-products" data-url="/en-pk/search?section_id=template--14940997058625__recently-viewed-products&type=product&q=" data-product-id={6637325615169}>
                <div className="section-padding">
                    <h2 className="text-center small-heading">Recently Viewed</h2>
                    <ul className="collection__grid flex list-unstyled" role="list">
                      {menProducts ? menProducts.map((item)=>{
                        return <RVProducts item={item} key={item.id}/>
                      }): <p>Loading...</p>}
                        </ul>
                </div>
                </recently-viewed-products>
        </section>

    )
}
