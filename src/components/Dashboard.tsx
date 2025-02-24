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
    CircularProgress,
    ListSubheader
} from '@mui/material';
import { ApiService, Indicator } from '../services/api.service';

export const Dashboard = () => {
    const [indicators, setIndicators] = useState<Indicator[]>([]);
    const [selectedMeasure, setSelectedMeasure] = useState<string>('');
    const [selectedMeasureData, setSelectedMeasureData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchIndicators();
    }, []);

    useEffect(() => {
        if (selectedMeasure) {
            fetchMeasureData(selectedMeasure);
        } else {
            setSelectedMeasureData(null);
        }
    }, [selectedMeasure, indicators]);

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

    const fetchMeasureData = async (measureName: string) => {
        try {
            setLoading(true);
            const query = {
                query: {
                    measures: [measureName],
                    limit: 1000
                }
            };
            const data = await ApiService.getIndicatorData(query);
            if (data.error) {
                setError(data.error);
                setSelectedMeasureData(null);
            } else {
                setSelectedMeasureData(data);
                setError(null);
            }
        } catch (err: any) {
            setError(err.response?.data?.error || err.message || 'Failed to fetch measure data.');
            setSelectedMeasureData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleIndicatorChange = (event: any) => {
        setSelectedMeasure(event.target.value);
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
        <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ pt: 4, pb: 2 }}>
                <Typography variant="h4" component="h1" align="left">
                    Indicateurs de la Transition Écologique
                </Typography>
            </Box>

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <FormControl fullWidth>
                        <InputLabel id="indicator-select-label">Selectionner l'indicateur</InputLabel>
                        <Select
                            labelId="indicator-select-label"
                            id="indicator-select"
                            value={selectedMeasure}
                            label="Select Indicator"
                            onChange={handleIndicatorChange}
                        >
                            {indicators.map((indicator) => [
                                <ListSubheader key={`header-${indicator.name}`}>
                                    {indicator.title}
                                </ListSubheader>,
                                Object.entries(indicator.measures || {}).map(([id, measure]) => (
                                    <MenuItem 
                                        key={id} 
                                        value={measure.name}
                                        sx={{ pl: 4 }}
                                    >
                                        {measure.title}
                                    </MenuItem>
                                ))
                            ])}
                        </Select>
                    </FormControl>
                </Paper>

                {error ? (
                    <Paper elevation={3} sx={{ p: 3, bgcolor: 'error.light' }}>
                        <Typography color="error.contrastText">
                            {error}
                        </Typography>
                    </Paper>
                ) : selectedMeasureData && (
                    <Paper elevation={3} sx={{ p: 3, flex: 1 }}>
                        <Typography variant="h6" gutterBottom>
                            Résultats
                        </Typography>
                        <pre style={{ overflow: 'auto', maxHeight: 'calc(100vh - 400px)' }}>
                            {JSON.stringify(selectedMeasureData, null, 2)}
                        </pre>
                    </Paper>
                )}
            </Box>
        </Container>
    );
}; 