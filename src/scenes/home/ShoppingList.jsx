import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import Items from "../../components/Items";
import { setItems } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { data, error, isLoading } = useSWR(
    "https://ecommerce-backend-nuo1.onrender.com/api/items?populate=image",
    fetcher,
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    data && dispatch(setItems(data.data));
  }, [data]);

  const topRatedItems = items.filter(
    (item) => item.attributes.category === "topRated",
  );
  const newArrivalsItems = items.filter(
    (item) => item.attributes.category === "newArrivals",
  );
  const bestSellersItems = items.filter(
    (item) => item.attributes.category === "bestSellers",
  );

  const loadingSkeleton = (
    <>
      <div>
        <Skeleton variant="rectangular" width="300px" height="400px" />
        <Skeleton width="130px" />
        <Skeleton width="200px" />
        <Skeleton width="50px" />
      </div>
      <div>
        <Skeleton variant="rectangular" width="300px" height="400px" />
        <Skeleton width="130px" />
        <Skeleton width="200px" />
        <Skeleton width="50px" />
      </div>
      <div>
        <Skeleton variant="rectangular" width="300px" height="400px" />
        <Skeleton width="130px" />
        <Skeleton width="200px" />
        <Skeleton width="50px" />
      </div>
      <div>
        <Skeleton variant="rectangular" width="300px" height="400px" />
        <Skeleton width="130px" />
        <Skeleton width="200px" />
        <Skeleton width="50px" />
      </div>
    </>
  );

  const renderedProductList = (
    <>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          (isLoading
            ? loadingSkeleton
            : items.map((item) => (
                <Items item={item} key={`${item.name}-${item.id}`} />
              )))}
        {value === "newArrivals" &&
          (isLoading
            ? loadingSkeleton
            : newArrivalsItems.map((item) => (
                <Items item={item} key={`${item.name}-${item.id}`} />
              )))}
        {value === "bestSellers" &&
          (isLoading
            ? loadingSkeleton
            : bestSellersItems.map((item) => (
                <Items item={item} key={`${item.name}-${item.id}`} />
              )))}
        {value === "topRated" &&
          (isLoading
            ? loadingSkeleton
            : topRatedItems.map((item) => (
                <Items item={item} key={`${item.name}-${item.id}`} />
              )))}
      </Box>
    </>
  );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      {renderedProductList}
    </Box>
  );
};

export default ShoppingList;
