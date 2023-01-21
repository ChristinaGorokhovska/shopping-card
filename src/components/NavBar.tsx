import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import Container from "@mui/material/Container";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { UseStoreCart } from "../context/StoreCartContext";

function NavBar() {
  const { openCart, quantityOfItemsInCart } = UseStoreCart();
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ gap: 2, flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link
              href="/"
              component="a"
              variant="body2"
              sx={{ my: 2, color: "white", display: "block", textDecoration: "none" }}
            >
              Home
            </Link>
            <Link
              href="/about"
              component="a"
              variant="body2"
              sx={{ my: 2, color: "white", display: "block", textDecoration: "none" }}
            >
              About
            </Link>
            <Link
              href="/contacts"
              component="a"
              variant="body2"
              sx={{ my: 2, color: "white", display: "block", textDecoration: "none" }}
            >
              Contacts
            </Link>
            <Link
              href="/store"
              component="a"
              variant="body2"
              sx={{ my: 2, color: "white", display: "block", textDecoration: "none" }}
            >
              Store
            </Link>
          </Box>

          {quantityOfItemsInCart > 0 && (
            <Box>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={openCart}>
                <Badge badgeContent={quantityOfItemsInCart} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
