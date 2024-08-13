import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../../css/styles/owl.carousel.css";
import { ShimmerDiv, ShimmerText } from "shimmer-effects-react";
import CountdownTimer from "../UI/CountdownTimer";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewItems()
  }, []);

  async function fetchNewItems() {
    try {
      const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);

    }
  }

  const options = {
    loop: true,
    nav: true,
    items: 4,
    dots: false,
    margin: 5,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            new Array(4).fill(0).map((_, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={index}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <div>
                      <ShimmerDiv
                        mode="light"
                        center={true}
                        height={50}
                        width={50}
                        rounded={50}
                      />
                    </div>
                  </div>
                  <div className="nft__item_wrap">
                    <ShimmerDiv
                      className="nft-wrap--img"
                      mode="light"
                      height={"100%"}
                      width={"100%"}
                      center={true}
                    />
                  </div>
                  <div className="nft__item_info">
                    <div className="skeleton skeleton-text">
                      <ShimmerText
                        mode="light"
                        center={true}
                        width={100}
                        line={1}
                      />
                    </div>
                    <div className="skeleton skeleton-text">
                      <ShimmerText
                        mode="light"
                        center={true}
                        width={100}
                        line={1}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <OwlCarousel {...options}>
              {items.map((item, index) => (
                <div className="item" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${item.id}`}
                      >
                        <img
                          className="lazy"
                          src={item.authorImage}
                          alt={`${item.creator} profile`}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate && (
                      <div className="de_countdown">
                        <CountdownTimer expiryDate={item.expiryDate} />
                      </div>
                    )}
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <Link to={`/item-details/${item.authorId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt={item.title}
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.authorId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;