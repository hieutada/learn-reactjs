import {
  Box,
  Container,
  Grid,
  LinearProgress,
  makeStyles,
  Paper
} from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { addToCart } from '../../Cart/cartSlice';
import AddToCardForm from '../components/AddToCardForm';
import ProductAdditional from '../components/Menu/ProductAdditional';
import ProductDescription from '../components/Menu/ProductDescription';
import ProductReviews from '../components/Menu/ProductReviews';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },

  left: {
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },

  right: {
    padding: theme.spacing(1.5),
  },

  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
}));

function DetailPage(props) {
  const classes = useStyles();

  const {
    params: { productId },
    url,
  } = useRouteMatch();

  const dispatch = useDispatch();

  const { product, loading } = useProductDetail(productId);

  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }

  const handleAddToCardSubmit = ({quantity}) => {
    const action = addToCart({
      id: product.id,
      product,
      quantity,
    });
    console.log('Form submit', action)
    dispatch(action);
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Paper>
          <Grid container>
            <Grid item className={classes.left} xs={12} sm={5} md={4} lg={5}>
              <ProductThumbnail product={product} />
            </Grid>

            <Grid item className={classes.right} xs={12} sm={7} md={8} lg={7}>
              <ProductInfo product={product} />
              <AddToCardForm onSubmit={handleAddToCardSubmit} />
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu />

        <Switch>
          <Route exact path={url}>
            <ProductDescription product={product} />
          </Route>
          <Route path={`${url}/additional`}>
            <ProductAdditional />
          </Route>
          <Route path={`${url}/reviews`}>
            <ProductReviews />
          </Route>
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
