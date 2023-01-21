import NavBar from "../components/NavBar";
import storeItems from "../dataDB/storeItems.json";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import StoreItem from "../components/StoreItem";

export default function Store() {
  return (
    <div>
      <NavBar />
      <Container>
        {" "}
        <Grid container mt={3} spacing={3}>
          {storeItems.map((item) => (
            <Grid key={item.id} xs={12} sm={6} md={4} item>
              <StoreItem {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
