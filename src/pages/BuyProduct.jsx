// BuyProduct.jsx
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Box,
  Alert,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useProduct } from "../ProductData/useProduct";
import { useParams } from "react-router-dom";

export default function BuyProduct({isLight}) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { products } = useProduct();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const existingProduct = products.find((p) => p._id === id);
    if (existingProduct) {
      setProduct({
        name: existingProduct.name,
        price: existingProduct.price,
        image: existingProduct.image,
      });
    }
  }, [id, products]);

  const handleBuy = () => {
    setSuccess(true);
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: { xs: "auto", md: "91vh" },
        borderRadius: 0,
        boxShadow: 4,
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, 
      }}
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        sx={{
          width: { xs: "100%", md: "50%" },
          height: { xs: "250px", md: "100%" },
          objectFit: "cover",
        }}
      />

      <CardContent
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: { xs: 3, md: 6 },
          bgcolor: isLight? "#fff":"#1e2939",
          color:isLight?"black":"white"
        }}
      >
        <Typography variant="h5" md={{ variant: "h4" }} fontWeight="bold" gutterBottom fontFamily={"cursive"} fontSize={"50px"}>
          {product.name}
        </Typography>

        <Typography variant="body2"  sx={{ mb: 3 }}>
          Premium quality product with exclusive design.
        </Typography>

       
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Base Price: ${product.price}
        </Typography>

      
        <Typography
          variant="h5"
          sx={{ color: "primary.main", fontWeight: "bold", mb: 2 }}
        >
          Total Price: ${product.price * quantity || 0}
        </Typography>

        <Box sx={{ borderBottom: "1px solid #ddd", mb: 3 }} />

        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3}}>
          <Typography fontWeight="500">Quantity:</Typography>
          <TextField
            type="number"
            size="small"
            value={quantity}
            inputProps={{ min: 1 }}
            onChange={(e) => setQuantity(Number(e.target.value))}
            sx={{ width: "100px" , border:"1px solid white",color:"white"}}
          />
        </Box>
       
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            borderRadius: 3,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "none",
          }}
          onClick={handleBuy}
        >
          Buy Now
        </Button>

        {success && (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            sx={{ mt: 3, borderRadius: 2 }}
          >
            🎉 You successfully purchased <b>{product.name}</b>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
