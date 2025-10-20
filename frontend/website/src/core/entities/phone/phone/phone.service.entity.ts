import {EntityServiceBase} from "../../entity.service.base.ts";
import {PhoneDomainEntity} from "./phone.domain.entity.ts";
import {PhoneRepositoryEntity} from "./phone.repository.entity.ts";
import {StatusService} from "../../status/status.service.entity.ts";
import {PhoneTypeServiceEntity} from "../phoneType/phoneType.service.entity.ts";
import type {PhoneTypeEntity} from "../phoneType/phoneType.domain.entity.ts";
import type {StatusEntity} from "../../status/status.domain.entity.ts";
import type {PhoneCodeEntity} from "../phoneCode/phoneCode.domain.entity.ts";
import {PhoneCodeServiceEntity} from "../phoneCode/phoneCode.service.entity.ts";

export class PhoneServiceEntity extends EntityServiceBase<PhoneDomainEntity, PhoneRepositoryEntity> {
    static RepositoryClass = PhoneRepositoryEntity;
    protected readonly DomainClass = PhoneDomainEntity;

    private readonly statusService: StatusService = new StatusService();
    private readonly phoneTypeService: PhoneTypeServiceEntity = new PhoneTypeServiceEntity();
    private readonly phoneCodeService: PhoneCodeServiceEntity = new PhoneCodeServiceEntity();

    public async loadReferenceData(): Promise<{
        phoneType: Partial<PhoneTypeEntity>[];
        status: Partial<StatusEntity>[];
        ddiCode: { ddiCode: number | undefined }[];
        dddCode: { dddCode: number | undefined }[];
    }> {

        const phoneTypes: Partial<PhoneTypeEntity>[] = await this.phoneTypeService.extractPropertiesList('description');
        const statuses: Partial<StatusEntity>[] = await this.statusService.extractPropertiesList('description');

        return {
            phoneType: phoneTypes,
            status: statuses,
            ...(await this.extractDddCodeAndDdiCodeList())
        }
    }

    public async extractDddCodeAndDdiCodeList(): Promise<{
        ddiCode: { ddiCode: number | undefined }[];
        dddCode: { dddCode: number | undefined }[];
    }> {
        const phoneCodes: Partial<PhoneCodeEntity>[] = await this.phoneCodeService.extractPropertiesList(['ddiCode', 'dddCode']);

        const ddiCodesSet = new Set<number | undefined>();
        const ddiCodes = phoneCodes.reduce((acc, item) => {
            if (!ddiCodesSet.has(item.ddiCode)) {
                ddiCodesSet.add(item.ddiCode);
                acc.push({ ddiCode: item.ddiCode });
            }
            return acc;
        }, [] as { ddiCode: number | undefined }[]);

        const dddCodesSet = new Set<number | undefined>();
        const dddCodes = phoneCodes.reduce((acc, item) => {
            if (!dddCodesSet.has(item.dddCode)) {
                dddCodesSet.add(item.dddCode);
                acc.push({ dddCode: item.dddCode });
            }
            return acc;
        }, [] as { dddCode: number | undefined }[]);

        return {
            ddiCode: ddiCodes,
            dddCode: dddCodes
        }
    }
}