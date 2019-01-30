import { Router } from 'express';
import partyCtr from '../controllers/partyCtr';

const router = Router();
const { createParty, getPartyById, getParties, update, delete } = partyCtr;

// api/v1/parties/
router
    .route('/')
    .post(createParty)
    .get(getParties);

    // api/v1/parties/:partyId
    router
    .route('/:partyId')
    .get(getPartyById);

    // api/v1/:id/name
    router
    .route('/:id/name')
    .put(update);

    router
    .route('/:id')
    .delete(delete)

    export default router;


