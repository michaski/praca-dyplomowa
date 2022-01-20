import { BandMemberAction } from "../../models/Bands/BandMemberAction";
import { UpdateBand } from "../../models/Bands/UpdateBand";
import { BANDS_CONTROLLER } from "../../utils/apiUrls";
import requests from "../../utils/requests/requests";
import auth from "../auth/auth";

const BandService = {
    getAll: async () => {
        const result = await requests.get(BANDS_CONTROLLER, auth.getToken(), () => {
            return [];
        });
        return result;
    },
    getAllManaged: async () => {
        const result = await requests.get(`${BANDS_CONTROLLER}/userIsLeader`, auth.getToken(), () => {
            return [];
        });
        return result;
    },
    getById: async (id: string) => {
        const result = await requests.get(`${BANDS_CONTROLLER}/${id}`, auth.getToken());
        return result;
    },
    create: async (bandName: string) => {
        const result = await requests.post(`${BANDS_CONTROLLER}/create/${bandName}`, null, auth.getToken());
        return result;
    },
    addMember: async (data: BandMemberAction) => {
        const result = await requests.post(`${BANDS_CONTROLLER}/addMember`, data, auth.getToken());
        return result;
    },
    update: async (data: UpdateBand) => {
        await requests.put(`${BANDS_CONTROLLER}/editBandInfo`, data, auth.getToken());
    },
    promoteMember: async (data: BandMemberAction) => {
        await requests.put(`${BANDS_CONTROLLER}/promoteMember`, data, auth.getToken());
    },
    demoteMember: async (data: BandMemberAction) => {
        await requests.put(`${BANDS_CONTROLLER}/demoteLeader`, data, auth.getToken());
    },
    delete: async (id: string) => {
        await requests.delete(`${BANDS_CONTROLLER}/${id}`, null, auth.getToken());
    },
    removeMember: async (data: BandMemberAction) => {
        await requests.delete(`${BANDS_CONTROLLER}/removeMember`, data, auth.getToken());
    }
}

export default BandService;
