import { Container, Box, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="text.secondary"
        color="white"
      >
        <Container>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box>
                <Link to="/contact" color="inherit">
                  Contact
                </Link>
              </Box>
              <Box>
                <Link to="/contact" color="inherit">
                  Support
                </Link>
              </Box>
              <Box>
                <Link to="/contact" color="inherit">
                  Privacy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Account</Box>
              <Box>
                <Link to="/login" color="inherit">
                  Login
                </Link>
              </Box>
              <Box>
                <Link to="/register" color="inherit">
                  Register
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Messages</Box>
              <Box>
                <Link to="/contact" color="inherit">
                  Backup
                </Link>
              </Box>
              <Box>
                <Link to="/contact" color="inherit">
                  History
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 10 }}>Ta Trung Hieu</Box>
        </Container>
      </Box>
    </footer>
  );
}
