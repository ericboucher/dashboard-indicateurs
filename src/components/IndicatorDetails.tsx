import { 
    Typography,
    Box,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemText,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import { Indicator } from '../services/api.service';

interface IndicatorDetailsProps {
    indicator: Indicator;
    measureData: any;
}

export const IndicatorDetails = ({ indicator, measureData }: IndicatorDetailsProps) => {
    const measures = Object.values(indicator.measures || {});
    const dimensions = Object.values(indicator.dimensions || {});

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                {indicator.title}
            </Typography>
            
            {indicator.description && (
                <Box mb={3}>
                    <Typography variant="body1" color="text.secondary">
                        {indicator.description}
                    </Typography>
                </Box>
            )}

            <Divider sx={{ my: 2 }} />

            <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                    Mesures disponibles
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {measures.map((measure) => (
                        <Chip
                            key={measure.name}
                            label={measure.title || measure.name}
                            color="primary"
                            variant="outlined"
                            title={measure.shortTitle || measure.title}
                        />
                    ))}
                </Stack>
            </Box>

            {measureData && measureData.data && measureData.data.length > 0 && (
                <Box mb={3}>
                    <Typography variant="h6" gutterBottom>
                        Données
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {Object.keys(measureData.data[0]).map((key) => (
                                        <TableCell key={key}>{key}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {measureData.data.map((row: any, index: number) => (
                                    <TableRow key={index}>
                                        {Object.values(row).map((value: any, i: number) => (
                                            <TableCell key={i}>{value}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}

            <Box>
                <Typography variant="h6" gutterBottom>
                    Dimensions d'analyse
                </Typography>
                <List>
                    {dimensions.map((dimension) => (
                        <ListItem key={dimension.name}>
                            <ListItemText 
                                primary={dimension.title || dimension.name}
                                secondary={`Type: ${dimension.type}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
}; 