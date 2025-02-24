import { useState, useEffect } from 'react';
import { 
    Container, 
    Box, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    Typography,
    Paper,
    Grid,
    CircularProgress
} from '@mui/material';
import { ApiService, Indicator } from '../services/api.service';

export const Dashboard = () => {
    const [indicators, setIndicators] = useState<Indicator[]>([]);
    const [selectedIndicator, setSelectedIndicator] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchIndicators();
    }, []);

    const fetchIndicators = async () => {
        try {
            setLoading(true);
            const data = await ApiService.getIndicators();
            setIndicators(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch indicators. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleIndicatorChange = (event: any) => {
        setSelectedIndicator(event.target.value);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box py={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Ecological Transition Indicators
                </Typography>

                <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                    <FormControl fullWidth>
                        <InputLabel id="indicator-select-label">Select Indicator</InputLabel>
                        <Select
                            labelId="indicator-select-label"
                            id="indicator-select"
                            value={selectedIndicator}
                            label="Select Indicator"
                            onChange={handleIndicatorChange}
                        >
                            {indicators.map((indicator) => (
                                <MenuItem key={indicator.name} value={indicator.name}>
                                    {indicator.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Paper>

                {selectedIndicator && (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 3 }}>
                                <Typography variant="h6" gutterBottom>
                                    Selected Indicator Details
                                </Typography>
                                {/* We'll add visualization components here */}
                            </Paper>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Container>
    );
}; 