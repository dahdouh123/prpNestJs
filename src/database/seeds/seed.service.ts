import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Guid } from "guid-typescript";
import { Repository, DeepPartial } from "typeorm";
import { ACSHolding } from "../../modules/account/account/entities/acsholding.entity";
import { ApplicationRole } from "../../modules/account/account/entities/ApplicationRole";
import { ApplicationUserRole } from "../../modules/account/account/entities/application-user-role.entity";
import { ApplicationUser } from "../../modules/account/account/entities/application-user.entity";
import { Roles } from "../../modules/account/account/Roles";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService implements OnModuleInit {
    constructor(
        @InjectRepository(ACSHolding, 'prpacsidentity') // Specify the correct connection
        private readonly acsHoldingRepository: Repository<ACSHolding>,
        
        @InjectRepository(ApplicationRole, 'prpacsidentity')
        private readonly roleRepository: Repository<ApplicationRole>,
        
        @InjectRepository(ApplicationUser, 'prpacsidentity')
        private readonly appUsersRepository: Repository<ApplicationUser>,
        
        @InjectRepository(ApplicationUserRole, 'prpacsidentity')
        private readonly appUsersRolesRepository: Repository<ApplicationUserRole>,
    ) {}

    async onModuleInit() {
        await this.seed();
    }

    private async seed() {
        await this.seedHoldings();
        await this.seedRoles();
        await this.seedAppUsers();
        await this.seedAppUsersRoles();
    }

    private async seedHoldings() {
       const  acsHoldings  = [
            {
              id: "384d9961-8915-4298-b4ee-03d553aeaf00",
              nom: "FILIALE SIPLAST",
              societeMere: "GROUPE ENPC",
              estsocieteMere: false,
              type: "FILIALE",
              logo:"assets/filiales/enpc_no_background.png"
            },
            {
              id: "cefb59ca-1b0d-43bb-b0ad-0588aa05d75b",
              nom: "FILIALE CALPLAST",
              societeMere: "GROUPE ENPC",
              estsocieteMere: false,
              type: "FILIALE",
              logo:"assets/filiales/enpc_no_background.png"

            },
            {
              id: "0f28b1d1-6267-4e83-89e0-1020509a041b",
              nom: "FILIALE TRYCYPLAST",
              societeMere: "GROUPE ENPC",
              estsocieteMere: false,
              type: "FILIALE",
              logo:"assets/filiales/enpc.png"
            },
            {
              id: "72ad2da6-ff64-4d9d-aea4-1334cd4791a1",
              nom: "FILIALE SACAR",
              societeMere: "GROUPE GIPEC",
              estsocieteMere: false,
              type: "FILIALE",
              logo:"assets/filiales/gipec.png"
            },
            {
              id: "6182cf74-ab78-486d-b495-168e95499fe8",
              nom: "FILIALE SHYMECA",
              societeMere: "GROUPE ENAD",
              estsocieteMere: false,
              type: "FILIALE",
              logo:"assets/filiales/enad.png"
            },
            {
              id: "A8D32B74-8B65-432B-851D-69C473C00FA3",
              nom: "FILIALE ALMOULES",
              societeMere: "GROUPE ENPC",
              estsocieteMere: false,
              type: "FILIALE",
              logo:"assets/filiales/enpc.png"
            },
            {
              id: "14B5D605-97C2-4F29-9A40-9061E6316F88",
              nom: "FILIALE VIVAPLAST",
              societeMere: "GROUPE ENPC",
              estsocieteMere: false,
              type: "FILIALE",
              logo:"assets/filiales/enpc.png"
            },
            {
              id: "94c17cde-3b8c-4c31-8a9c-39b96b24af1a",
              nom: "FILIALE SOFIPLAST",
              societeMere: "GROUPE ENPC",
              estsocieteMere: false,
              type: "FILIALE",
              logo:"assets/filiales/enpc.png"
            },
            {
              id: "2AAEFB09-84A5-48A5-812B-43B4F36712ED",
              nom: "FILIALE SOEXPLAST",
              societeMere: "GROUPE ENPC",
              estsocieteMere: false,
              type: "FILIALE",
              logo:"assets/filiales/enpc.png"
            },
            {
              id: "1BE4510E-69C7-4EB3-BEF7-A3FCADC8AEC9",
              nom: "FILIALE HIDAB",
              societeMere: "GROUPE ENPC",
              estsocieteMere: false,
              type: "FILIALE",
              logo:"assets/filiales/enpc.png"
            },
           
            {
              id: "76c45c3a-7be6-491f-b08f-409e80854aed",
              nom: " EPE 3R-SANTE",
              societeMere: "Holding ACS",
              estsocieteMere: false,
              type: "EPE",
              logo:"assets/filiales/3rsante.png"
            },
            {
              id: "e8b85c8a-83b5-4646-bc74-b0b1b8cb8778",
              nom: " EPE EN-DIMED",
              societeMere: "Holding ACS",
              estsocieteMere: false,
              type: "EPE",
              logo:"assets/filiales/endimed.png"
            },
            {
              id: "cadfcb7f-1cce-4ee1-a8fb-4354d8b2c951",
              nom: "FILIALE FIPEXPLAST",
              societeMere: "GROUPE ENPC",
              estsocieteMere: false,
              type: "FILIALE",
              logo:"assets/filiales/enpc.png"
            },
            {
              id: "dc290ede-9561-4c77-8c4b-44f5dcbea4bb",
              nom: " GROUPE ENPC",
              societeMere: "Holding ACS",
              estsocieteMere: true,
              type: "GROUPE",
              logo:"assets/filiales/enpc.png"
            },
            {
              id: "7f6631d3-eeff-4aa6-830a-481643664ba3",
              nom: "FILIALE AFRICAVER",
              societeMere: "GROUPE ENAVA",
              estsocieteMere: false,
              type: "FILIALE",
              logo:"assets/filiales/enava.png"
            },
            {
              id: "D86B24E7-7035-4D6D-87E7-08116D6C69D7",
              nom: "FILIALE NOVER",
              societeMere: "GROUPE ENAVA",
              estsocieteMere: false,
              type: "FILIALE",
              logo:"assets/filiales/enava.png"
            },
            {
              id: "f43307ec-2b3a-4491-be2e-80fb6ec10d3f",
              nom: "FILIALE ABRAS",
              societeMere: "GROUPE ENAVA",
              estsocieteMere: false,
              type: "FILIALE",
              logo:"assets/filiales/enava.png"
            },
            {
              id: "d92c19c4-55f1-4f7b-95da-4bc5110af8d0",
              nom: "FILIALE SISCOPLAST",
              societeMere: "GROUPE ENPC",
              estsocieteMere: false,
              type: "FILIALE",
              logo:"assets/filiales/enpc.png"
            },
            {
              id: "a5cc1fc0-7fc7-4aa9-a72f-519081d22057",
              nom: " EPE TONIC INDUSTRIE",
              societeMere: "Holding ACS",
              estsocieteMere: false,
              type: "EPE",
              logo:"assets/filiales/tonic.png"
            },
            {
              id: "d50d846f-7860-47cb-81c2-57b3434a3d09",
              nom: " EPE DIPROCHIM",
              societeMere: "Holding ACS",
              estsocieteMere: false,
              type: "EPE",
              logo:"assets/filiales/diprochim.png"
            },
            
            {
              id: "4f35c7c5-3ef9-4d0a-9c07-6d4b49799bbb",
              nom: "FILIALE SOMIVER",
              societeMere: "GROUPE ENAVA",
              estsocieteMere: false,
              type: "FILIALE",
              logo:"assets/filiales/enava.png"
            },
            {
              id: "009af9e4-cc71-4192-8659-7db9ab3c203e",
              nom: "FILIALE ORAN SAC",
              societeMere: "GROUPE GIPEC",
              estsocieteMere: false,
              type: "FILIALE",
              logo:"assets/filiales/gipec.png"
            },
            {
              id: "bc0bbb62-d975-4645-8bec-80a4dfde0a33",
              nom: " GROUPE ENAVA",
              societeMere: "Holding ACS",
              estsocieteMere: true,
              type: "GROUPE",
              logo:"assets/filiales/enava.png"
            },
            {
              id: "cb5c4ce7-45c3-46e9-af06-8d015f4e7ae1",
              nom: "FILIALE EMBAG",
              societeMere: "GROUPE GIPEC",
              estsocieteMere: false,
              type: "FILIALE",
              logo:"assets/filiales/gipec.png"
            },
            {
              id: "adcfbfd5-00c6-4869-9fc9-9b3887852bba",
              nom: "FILIALE TRANSPOLYMERES",
              societeMere: "GROUPE ENPC",
              estsocieteMere: false,
              type: "FILIALE",
              logo:"assets/filiales/enpc.png"
            },
            {
              id: "1be4510e-69c7-4eb3-bef7-a3fcadc8aec9",
              nom: "FILIALE Hidab Plast",
              societeMere: "GROUPE ENPC",
              estsocieteMere: false,
              type: "FILIALE",
              logo:"assets/filiales/enpc.png"
            },
            {
              id: "3c7a0482-2aa8-43fb-bff5-b4071484dd39",
              nom: " EPE ENAP",
              societeMere: "Holding ACS",
              estsocieteMere: false,
              type: "EPE",
              logo:"assets/filiales/enap.png"
            },
            {
              id: "4e162ce6-34d1-40d0-ae6a-b5ac12705105",
              nom: "Holding ACS",
              societeMere: null,
              estsocieteMere: true,
              type: "SOCMERE",
              logo:"assets/myapplogo.png"
            },
            {
              id: "64b7d137-3969-46db-87dd-c1b77e7e0081",
              nom: "EPE SOCOTHYD",
              societeMere: "Holding ACS",
              estsocieteMere: false,
              type: "EPE",
              logo:"assets/filiales/socothyd.png"
            },
            {
              id: "ec8b943d-dad8-4e15-9b74-c6ebed32114d",
              nom: "GROUPE ENAD",
              societeMere: "Holding ACS",
              estsocieteMere: true,
              type: "GROUPE",
              logo:"assets/filiales/enad.png"

            },
           
            {
              id: "d2715ff4-e8c1-4b5b-b579-220dc4481b61",
              nom: "GROUPE GIPEC",
              societeMere: "Holding ACS",
              estsocieteMere: true,
              type: "GROUPE",
              logo:"assets/filiales/gipec.png"
            }
          ];
          

        for (const holding of acsHoldings) {
            const exists = await this.acsHoldingRepository.findOneBy({ id: holding.id });
            if (!exists) {
                await this.acsHoldingRepository.save(holding);
            }
            else
            {
              exists.logo=holding.logo;
             
                exists.nom=holding.nom;
              
              await this.acsHoldingRepository.update(exists.id,exists)
            }
        }
    }

    private async seedRoles() {
        function getEnumKeyByValue<T>(enumType: T, value: number): string | undefined {
            return Object.keys(enumType).find(key => (enumType as any)[key] === value);
          }
          
          const roles = [
            {
              id: Roles.SuperAdminACS.toString(),
              name: getEnumKeyByValue(Roles, Roles.SuperAdminACS), // Gets the key name
              normalizedName: getEnumKeyByValue(Roles, Roles.SuperAdminACS)?.toUpperCase(),
              concurrencyStamp: '88f0dec2-5364-4881-4817-1f2a135a8641',
            },
            {
              id: Roles.ManagerACS.toString(),
              name: getEnumKeyByValue(Roles, Roles.ManagerACS),
              normalizedName: getEnumKeyByValue(Roles, Roles.ManagerACS)?.toUpperCase(),
              concurrencyStamp: '1933aad7-120c-414f-a575-5681df13732f',
            },
            {
              id: Roles.AgentDeSaisieFiliale.toString(),
              name: getEnumKeyByValue(Roles, Roles.AgentDeSaisieFiliale),
              normalizedName: getEnumKeyByValue(Roles, Roles.AgentDeSaisieFiliale)?.toUpperCase(),
              concurrencyStamp: 'b9182488-5482-4051-af9d-5fea22182944',
            },
            {
              id: Roles.PcoFiliale.toString(),
              name: getEnumKeyByValue(Roles, Roles.PcoFiliale),
              normalizedName: getEnumKeyByValue(Roles, Roles.PcoFiliale)?.toUpperCase(),
              concurrencyStamp: '6f3d452f-28a5-42be-b474-716985d97820',
            },
            {
              id: Roles.ManagerEpe.toString(),
              name: getEnumKeyByValue(Roles, Roles.ManagerEpe),
              normalizedName: getEnumKeyByValue(Roles, Roles.ManagerEpe)?.toUpperCase(),
              concurrencyStamp: '361068d4-d2fe-44ba-b8bc-d7fc44cd0224',
            },
            {
              id: Roles.ManagerGroupe.toString(),
              name: getEnumKeyByValue(Roles, Roles.ManagerGroupe),
              normalizedName: getEnumKeyByValue(Roles, Roles.ManagerGroupe)?.toUpperCase(),
              concurrencyStamp: '4d6882c2-65d3-407e-8785-3eb3e82c74bd',
            },
          ];
          

          for (const role of roles) {
            const existingRole = await this.roleRepository.findOne({ where: { name: role.name } });
            if (!existingRole) {
              // Set the roleName explicitly if it's not set
              if (!role.name) {
                continue; // Skip saving if role name is empty
              }
              await this.roleRepository.save(role);
            }
          }
    }

    private async seedAppUsers() {
      //////////////////////////////////// DIRECTION GENERALE ACS //////////////////////////////////////////////////
        const applicationUsers = [
          /////////////////////////// PRESIDENT DE GROUPE ACS /////////////////////////////
            {
              id: "3cbf3570-0d44-4673-8746-29b7cf568093",
              userName: "pdg.prp@holdingacs.dz",
              email: "pdg.prp@holdingacs.dz",
              normalizedUserName: "pdg.prp@HOLDINGACS.DZ",
              normalizedEmail: "pdg.prp@HOLDINGACS.DZ",
              passwordHash:
                await bcrypt.hash("Supportagent123@", 10),
              emailConfirmed: true,
              ACSHoldingId: "4e162ce6-34d1-40d0-ae6a-b5ac12705105",
            },
            //////////////////////////////// MANAGER ACS (MR BOUIDER )//////////////////////////////////
            {
              id: "635dfbf8-fadb-4aa0-87f2-790fe9d4282b",
              userName: "manager.prp@holdingacs.dz",
              email: "manager.prp@holdingacs.dz",
              normalizedUserName: "manager.prp@HOLDINGACS.DZ",
              normalizedEmail: "manager.prp@HOLDINGACS.DZ",
              passwordHash:
                await bcrypt.hash("Supportagent123@", 10),
              emailConfirmed: true,
              ACSHoldingId: "4e162ce6-34d1-40d0-ae6a-b5ac12705105",
            },
            ///////////////////////////////////////// GROUPE ENAD //////////////////////////////////////////
            //////////////////// PDG ENAD /////////////////////////////////////////
            {
              id: "56d78de8-2c58-40bc-b6ad-5b89dd0266f5",
              userName: "pdg_enad.prp@holdingacs.dz",
              email: "pdg_enad.prp@holdingacs.dz",
              normalizedUserName: "pdg_enad.prp@holdingacs.dz",
              normalizedEmail: "pdg_enad.prp@holdingacs.dz",
              passwordHash:
                await bcrypt.hash("Supportagent123@", 10),
              emailConfirmed: true,
              ACSHoldingId: "ec8b943d-dad8-4e15-9b74-c6ebed32114d",
            },
            //////////////////// MANAGER ENAD /////////////////////////////////////////
            {
              id: "1f030c86-fbd5-4a9b-82f9-48b1ce05f86e",
              userName: "manager_enad.prp@holdingacs.dz",
              email: "manager_enad.prp@holdingacs.dz",
              normalizedUserName: "manager_enad.prp@holdingacs.dz",
              normalizedEmail: "manager_enad.prp@holdingacs.dz",
              passwordHash:
                await bcrypt.hash("Supportagent123@", 10),
              emailConfirmed: true,
              ACSHoldingId: "ec8b943d-dad8-4e15-9b74-c6ebed32114d",
            },
            //////////////////////// SHYMECA FILIALE //////////////////////////////////
            {
              id: "d466ef00-61f1-4e77-801a-b016f0f12323",
              userName: "pco_shemyca.prp@holdingacs.dz",
              email: "pco_shemyca.prp@holdingacs.dz",
              normalizedUserName: "pco_shemyca.prp@holdingacs.dz",
              normalizedEmail: "pco_shemyca.prp@holdingacs.dz",
              passwordHash:
                await bcrypt.hash("Supportagent123@", 10),
              emailConfirmed: true,
              ACSHoldingId: "6182cf74-ab78-486d-b495-168e95499fe8",
            },
            {
              id: "f6654d1d-3921-45ac-9079-bfb1bffe100c",
              userName: "agent_shemyca.prp@holdingacs.dz",
              email: "agent_shemyca.prp@holdingacs.dz",
              normalizedUserName: "agent_shemyca.prp@holdingacs.dz",
              normalizedEmail: "agent_shemyca.prp@holdingacs.dz",
              passwordHash:
                await bcrypt.hash("Supportagent123@", 10),
              emailConfirmed: true,
              ACSHoldingId: "6182cf74-ab78-486d-b495-168e95499fe8",
            },
            //////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////// GROUPE ENPC /////////////////////////////////////////////////////////
            {
              id: "89348ac8-7c71-4df3-8cdb-ef68d2e715fc",
              userName: "pdg_enpc.prp@holdingacs.dz",
              email: "pdg_enpc.prp@holdingacs.dz",
              normalizedUserName: "pdg_enpc.prp@holdingacs.dz",
              normalizedEmail: "pdg_enpc.prp@holdingacs.dz",
              passwordHash: await bcrypt.hash("Supportagent123@", 10),
              emailConfirmed: true,
              ACSHoldingId: "DC290EDE-9561-4C77-8C4B-44F5DCBEA4BB",
          },
            {
              id: "0a482afe-ffbd-4ac6-b0c1-6b4cca1e747a",
              userName: "manager_enpc.prp@holdingacs.dz",
              email: "manager_enpc.prp@holdingacs.dz",
              normalizedUserName: "manager_enpc.prp@holdingacs.dz",
              normalizedEmail: "manager_enpc.prp@holdingacs.dz",
              passwordHash: await bcrypt.hash("Supportagent123@", 10),
              emailConfirmed: true,
              ACSHoldingId: "DC290EDE-9561-4C77-8C4B-44F5DCBEA4BB",
          },
           ///////////////////// VIVAPLAST ///////////////////////////
            {
              id: "e2007573-a278-4c45-8a9d-e54619c54877",
              userName: "pco_vivaplast.prp@holdingacs.dz",
              email: "pco_vivaplast.prp@holdingacs.dz",
              normalizedUserName: "pco_vivaplast.prp@holdingacs.dz",
              normalizedEmail: "pco_vivaplast.prp@holdingacs.dz",
              passwordHash:
                await bcrypt.hash("Supportagent123@", 10),
              emailConfirmed: true,
              ACSHoldingId: "14B5D605-97C2-4F29-9A40-9061E6316F88",
            },
            {
              id: "4c9e6347-7775-4073-aad6-8789102fd0d7",
              userName: "agent_vivaplast.prp@holdingacs.dz",
              email: "agent_vivaplast.prp@holdingacs.dz",
              normalizedUserName: "agent_vivaplast.prp@holdingacs.dz",
              normalizedEmail: "agent_vivaplast.prp@holdingacs.dz",
              passwordHash:
                await bcrypt.hash("Supportagent123@", 10),
              emailConfirmed: true,
              ACSHoldingId: "14B5D605-97C2-4F29-9A40-9061E6316F88",
            },   
    

    // F : SIPLAST
    {
        id: "12345678-0001-0001-0001-000000000001",
        userName: "pco_siplast.prp@holdingacs.dz",
        email: "pco_siplast.prp@holdingacs.dz",
        normalizedUserName: "pco_siplast.prp@holdingacs.dz",
        normalizedEmail: "pco_siplast.prp@holdingacs.dz",
        passwordHash: await bcrypt.hash("Supportagent123@", 10),
        emailConfirmed: true,
        ACSHoldingId: "384D9961-8915-4298-B4EE-03D553AEAF00",
    },
    {
        id: "22345678-0001-0001-0001-000000000002",
        userName: "agent_siplast.prp@holdingacs.dz",
        email: "agent_siplast.prp@holdingacs.dz",
        normalizedUserName: "agent_siplast.prp@holdingacs.dz",
        normalizedEmail: "agent_siplast.prp@holdingacs.dz",
        passwordHash: await bcrypt.hash("Supportagent123@", 10),
        emailConfirmed: true,
        ACSHoldingId: "384D9961-8915-4298-B4EE-03D553AEAF00",
    },

    // F : CALPLAST
    {
        id: "33345678-0001-0001-0001-000000000003",
        userName: "pco_calplast.prp@holdingacs.dz",
        email: "pco_calplast.prp@holdingacs.dz",
        normalizedUserName: "pco_calplast.prp@holdingacs.dz",
        normalizedEmail: "pco_calplast.prp@holdingacs.dz",
        passwordHash: await bcrypt.hash("Supportagent123@", 10),
        emailConfirmed: true,
        ACSHoldingId: "CEFB59CA-1B0D-43BB-B0AD-0588AA05D75B",
    },
    {
        id: "44345678-0001-0001-0001-000000000004",
        userName: "agent_calplast.prp@holdingacs.dz",
        email: "agent_calplast.prp@holdingacs.dz",
        normalizedUserName: "agent_calplast.prp@holdingacs.dz",
        normalizedEmail: "agent_calplast.prp@holdingacs.dz",
        passwordHash: await bcrypt.hash("Supportagent123@", 10),
        emailConfirmed: true,
        ACSHoldingId: "CEFB59CA-1B0D-43BB-B0AD-0588AA05D75B",
    },

    // F : TRYCYPLAST
    {
        id: "55345678-0001-0001-0001-000000000005",
        userName: "pco_trycyplast.prp@holdingacs.dz",
        email: "pco_trycyplast.prp@holdingacs.dz",
        normalizedUserName: "pco_trycyplast.prp@holdingacs.dz",
        normalizedEmail: "pco_trycyplast.prp@holdingacs.dz",
        passwordHash: await bcrypt.hash("Supportagent123@", 10),
        emailConfirmed: true,
        ACSHoldingId: "0F28B1D1-6267-4E83-89E0-1020509A041B",
    },
    {
        id: "66345678-0001-0001-0001-000000000006",
        userName: "agent_trycyplast.prp@holdingacs.dz",
        email: "agent_trycyplast.prp@holdingacs.dz",
        normalizedUserName: "agent_trycyplast.prp@holdingacs.dz",
        normalizedEmail: "agent_trycyplast.prp@holdingacs.dz",
        passwordHash: await bcrypt.hash("Supportagent123@", 10),
        emailConfirmed: true,
        ACSHoldingId: "0F28B1D1-6267-4E83-89E0-1020509A041B",
    },

    // F : ALMOULES
    {
        id: "50d44d53-7ba6-4657-b124-7edaf6d5a1c9",
        userName: "pco_almoules.prp@holdingacs.dz",
        email: "pco_almoules.prp@holdingacs.dz",
        normalizedUserName: "pco_almoules.prp@holdingacs.dz",
        normalizedEmail: "pco_almoules.prp@holdingacs.dz",
        passwordHash: await bcrypt.hash("Supportagent123@", 10),
        emailConfirmed: true,
        ACSHoldingId: "A8D32B74-8B65-432B-851D-69C473C00FA3",
    },
    {
        id: "62d44d53-7ba6-4657-b124-7edaf6d5a1c9",
        userName: "agent_almoules.prp@holdingacs.dz",
        email: "agent_almoules.prp@holdingacs.dz",
        normalizedUserName: "agent_almoules.prp@holdingacs.dz",
        normalizedEmail: "agent_almoules.prp@holdingacs.dz",
        passwordHash: await bcrypt.hash("Supportagent123@", 10),
        emailConfirmed: true,
        ACSHoldingId: "A8D32B74-8B65-432B-851D-69C473C00FA3",
    },


        {
            id: "938573c9-6b5b-4e18-912a-9c76bb027d9d",
            userName: "pco_sofiplast.prp@holdingacs.dz",
            email: "pco_sofiplast.prp@holdingacs.dz",
            normalizedUserName: "pco_sofiplast.prp@holdingacs.dz",
            normalizedEmail: "pco_sofiplast.prp@holdingacs.dz",
            passwordHash: await bcrypt.hash("Supportagent123@", 10),
            emailConfirmed: true,
            ACSHoldingId: "94C17CDE-3B8C-4C31-8A9C-39B96B24AF1A"
        },
        {
            id: "0a1b635d-d71b-4391-8e9e-1d94ad3a291d",
            userName: "agent_sofiplast.prp@holdingacs.dz",
            email: "agent_sofiplast.prp@holdingacs.dz",
            normalizedUserName: "agent_sofiplast.prp@holdingacs.dz",
            normalizedEmail: "agent_sofiplast.prp@holdingacs.dz",
            passwordHash: await bcrypt.hash("Supportagent123@", 10),
            emailConfirmed: true,
            ACSHoldingId: "94C17CDE-3B8C-4C31-8A9C-39B96B24AF1A"
        },
        
        // F : FIPEXPLAST
        {
            id: "d7a5fd82-82d3-4f12-935d-7d84f8c9d912",
            userName: "pco_fipexplast.prp@holdingacs.dz",
            email: "pco_fipexplast.prp@holdingacs.dz",
            normalizedUserName: "pco_fipexplast.prp@holdingacs.dz",
            normalizedEmail: "pco_fipexplast.prp@holdingacs.dz",
            passwordHash: await bcrypt.hash("Supportagent123@", 10),
            emailConfirmed: true,
            ACSHoldingId: "CADFCB7F-1CCE-4EE1-A8FB-4354D8B2C951"
        },
        {
            id: "fa6372e5-92a8-429f-957d-b9ef43221e1f",
            userName: "agent_fipexplast.prp@holdingacs.dz",
            email: "agent_fipexplast.prp@holdingacs.dz",
            normalizedUserName: "agent_fipexplast.prp@holdingacs.dz",
            normalizedEmail: "agent_fipexplast.prp@holdingacs.dz",
            passwordHash: await bcrypt.hash("Supportagent123@", 10),
            emailConfirmed: true,
            ACSHoldingId: "CADFCB7F-1CCE-4EE1-A8FB-4354D8B2C951"
        },
    
        // F : soexplast
        {
            id: "35b6259e-a9f6-4297-aef7-e20a56f73f34",
            userName: "pco_soexplast.prp@holdingacs.dz",
            email: "pco_soexplast.prp@holdingacs.dz",
            normalizedUserName: "pco_soexplast.prp@holdingacs.dz",
            normalizedEmail: "pco_soexplast.prp@holdingacs.dz",
            passwordHash: await bcrypt.hash("Supportagent123@", 10),
            emailConfirmed: true,
            ACSHoldingId: "2AAEFB09-84A5-48A5-812B-43B4F36712ED"
        },
        {
            id: "d516f573-98c4-44c2-8b59-5a2b81323db8",
            userName: "agent_soexplast.prp@holdingacs.dz",
            email: "agent_soexplast.prp@holdingacs.dz",
            normalizedUserName: "agent_soexplast.prp@holdingacs.dz",
            normalizedEmail: "agent_soexplast.prp@holdingacs.dz",
            passwordHash: await bcrypt.hash("Supportagent123@", 10),
            emailConfirmed: true,
            ACSHoldingId: "2AAEFB09-84A5-48A5-812B-43B4F36712ED"
        },
    
        // F : SISCOPLAST
        {
            id: "819b2929-730b-4a13-8050-632967cebb9f",
            userName: "pco_siscoplast.prp@holdingacs.dz",
            email: "pco_siscoplast.prp@holdingacs.dz",
            normalizedUserName: "pco_siscoplast.prp@holdingacs.dz",
            normalizedEmail: "pco_siscoplast.prp@holdingacs.dz",
            passwordHash: await bcrypt.hash("Supportagent123@", 10),
            emailConfirmed: true,
            ACSHoldingId: "D92C19C4-55F1-4F7B-95DA-4BC5110AF8D0"
        },
        {
            id: "78bfc9f1-7273-4c58-a115-3cdbbd78b137",
            userName: "agent_siscoplast.prp@holdingacs.dz",
            email: "agent_siscoplast.prp@holdingacs.dz",
            normalizedUserName: "agent_siscoplast.prp@holdingacs.dz",
            normalizedEmail: "agent_siscoplast.prp@holdingacs.dz",
            passwordHash: await bcrypt.hash("Supportagent123@", 10),
            emailConfirmed: true,
            ACSHoldingId: "D92C19C4-55F1-4F7B-95DA-4BC5110AF8D0"
        },
    
        // F : TRANSPOLYMERES
        {
            id: "d5134f9d-7f19-4743-b90d-5d6af5cc1fb7",
            userName: "pco_transpolymere.prp@holdingacs.dz",
            email: "pco_transpolymere.prp@holdingacs.dz",
            normalizedUserName: "pco_transpolymere.prp@holdingacs.dz",
            normalizedEmail: "pco_transpolymere.prp@holdingacs.dz",
            passwordHash: await bcrypt.hash("Supportagent123@", 10),
            emailConfirmed: true,
            ACSHoldingId: "ADCFBFD5-00C6-4869-9FC9-9B3887852BBA"
        },
        {
            id: "d2139c48-37af-47cb-9a1d-e1bc8d658ac6",
            userName: "agent_transpolymere.prp@holdingacs.dz",
            email: "agent_transpolymere.prp@holdingacs.dz",
            normalizedUserName: "agent_transpolymere.prp@holdingacs.dz",
            normalizedEmail: "agent_transpolymere.prp@holdingacs.dz",
            passwordHash: await bcrypt.hash("Supportagent123@", 10),
            emailConfirmed: true,
            ACSHoldingId: "ADCFBFD5-00C6-4869-9FC9-9B3887852BBA"
        },
    
      
        
{
    id : "21a987f7-d5f5-46a7-bc3a-598017367927",
    userName : "pco_hidabplast.prp@holdingacs.dz",
    email : "pco_hidabplast.prp@holdingacs.dz",
    normalizedUserName : "pco_hidabplast.prp@holdingacs.dz",
    normalizedEmail : "pco_hidabplast.prp@holdingacs.dz",
    passwordHash :
        await bcrypt.hash("Supportagent123@", 10),
    emailConfirmed : true,
    ACSHoldingId : "1BE4510E-69C7-4EB3-BEF7-A3FCADC8AEC9"
},

{
    id : "3bb34b83-63f3-4b80-8de5-e708b70c2d6f",
    userName : "agent_hidabplast.prp@holdingacs.dz",
    email : "agent_hidabplast.prp@holdingacs.dz",
    normalizedUserName : "agent_hidabplast.prp@holdingacs.dz",
    normalizedEmail : "agent_hidabplast.prp@holdingacs.dz",
    passwordHash :
        await bcrypt.hash("Supportagent123@", 10),
    emailConfirmed : true,
    ACSHoldingId : "1BE4510E-69C7-4EB3-BEF7-A3FCADC8AEC9"
},
///////////////////////////////////////////////////// DIRECTION ENAVA //////////////////////////////////////////////
{
  id : "b3354ef0-7055-4772-8e69-63daa31eaa6c",
  userName : "pdg_enava.prp@holdingacs.dz",
  email : "pdg_enava.prp@holdingacs.dz",
  normalizedUserName : "pdg_enava.prp@holdingacs.dz",
  normalizedEmail : "pdg_enava.prp@holdingacs.dz",
  passwordHash :
      await bcrypt.hash("Supportagent123@", 10),
  emailConfirmed : true,
  ACSHoldingId : "BC0BBB62-D975-4645-8BEC-80A4DFDE0A33"
},
{
    id : "973abde4-a60c-4010-8e8d-d9ada52f0cb8",
    userName : "manager_enava.prp@holdingacs.dz",
    email : "manager_enava.prp@holdingacs.dz",
    normalizedUserName : "manager_enava.prp@holdingacs.dz",
    normalizedEmail : "manager_enava.prp@holdingacs.dz",
    passwordHash :
        await bcrypt.hash("Supportagent123@", 10),
    emailConfirmed : true,
    ACSHoldingId : "BC0BBB62-D975-4645-8BEC-80A4DFDE0A33"
},
// F : AFRICAVER ////

{
    id : "4ca45d67-a4d2-42d1-bf8f-112ab8e7fd93",
    userName : "pco_africaver.prp@holdingacs.dz",
    email : "pco_africaver.prp@holdingacs.dz",
    normalizedUserName : "pco_africaver.prp@holdingacs.dz",
    normalizedEmail : "pco_africaver.prp@holdingacs.dz",
    passwordHash :
        await bcrypt.hash("Supportagent123@", 10),
    emailConfirmed : true,
    ACSHoldingId : "7F6631D3-EEFF-4AA6-830A-481643664BA3"
},

{
    id : "7f45d123-a5f8-40d4-bcd7-643f92b4f274",
    userName : "agent_africaver.prp@holdingacs.dz",
    email : "agent_africaver.prp@holdingacs.dz",
    normalizedUserName : "agent_africaver.prp@holdingacs.dz",
    normalizedEmail : "agent_africaver.prp@holdingacs.dz",
    passwordHash :
        await bcrypt.hash("Supportagent123@", 10),
    emailConfirmed : true,
    ACSHoldingId : "7F6631D3-EEFF-4AA6-830A-481643664BA3"
},
// F : SOMIVER ////

{
    id : "bbdc1a7f-416f-4e64-8c5a-7f631d6bda4c",
    userName : "pco_somiver.prp@holdingacs.dz",
    email : "pco_somiver.prp@holdingacs.dz",
    normalizedUserName : "pco_somiver.prp@holdingacs.dz",
    normalizedEmail : "pco_somiver.prp@holdingacs.dz",
    passwordHash :
        await bcrypt.hash("Supportagent123@", 10),
    emailConfirmed : true,
    ACSHoldingId : "4F35C7C5-3EF9-4D0A-9C07-6D4B49799BBB"
},

{
    id : "8f2d32b3-ae1a-472b-bf2c-5b2f35d1fa6d",
    userName : "agent_somiver.prp@holdingacs.dz",
    email : "agent_somiver.prp@holdingacs.dz",
    normalizedUserName : "agent_somiver.prp@holdingacs.dz",
    normalizedEmail : "agent_somiver.prp@holdingacs.dz",
    passwordHash :
        await bcrypt.hash("Supportagent123@", 10),
    emailConfirmed : true,
    ACSHoldingId : "4F35C7C5-3EF9-4D0A-9C07-6D4B49799BBB"
},
// F : ABRAS ////

{
    id : "f86c1381-9166-47b3-a058-4433da09471e",
    userName : "pco_abras.prp@holdingacs.dz",
    email : "pco_abras.prp@holdingacs.dz",
    normalizedUserName : "pco_abras.prp@holdingacs.dz",
    normalizedEmail : "pco_abras.prp@holdingacs.dz",
    passwordHash :
        await bcrypt.hash("Supportagent123@", 10),
    emailConfirmed : true,
    ACSHoldingId : "f43307ec-2b3a-4491-be2e-80fb6ec10d3f"
},

{
    id : "3db647be-2f24-46dc-91e3-cf26a6854ce6",
    userName : "agent_abras.prp@holdingacs.dz",
    email : "agent_abras.prp@holdingacs.dz",
    normalizedUserName : "agent_abras.prp@holdingacs.dz",
    normalizedEmail : "agent_abras.prp@holdingacs.dz",
    passwordHash :
        await bcrypt.hash("Supportagent123@", 10),
    emailConfirmed : true,
    ACSHoldingId : "f43307ec-2b3a-4491-be2e-80fb6ec10d3f"
},
// F : nover ////

{
    id : "5ebfdf0f-5f00-4ad1-a974-cea9bb146f94",
    userName : "pco_nover.prp@holdingacs.dz",
    email : "pco_nover.prp@holdingacs.dz",
    normalizedUserName : "pco_nover.prp@holdingacs.dz",
    normalizedEmail : "pco_nover.prp@holdingacs.dz",
    passwordHash :
        await bcrypt.hash("Supportagent123@", 10),
    emailConfirmed : true,
    ACSHoldingId : "D86B24E7-7035-4D6D-87E7-08116D6C69D7"
},

{
    id : "5385fc81-7c41-4299-b04d-d5af7c6f25ed",
    userName : "agent_nover.prp@holdingacs.dz",
    email : "agent_nover.prp@holdingacs.dz",
    normalizedUserName : "agent_nover.prp@holdingacs.dz",
    normalizedEmail : "agent_nover.prp@holdingacs.dz",
    passwordHash :
        await bcrypt.hash("Supportagent123@", 10),
    emailConfirmed : true,
    ACSHoldingId : "D86B24E7-7035-4D6D-87E7-08116D6C69D7"
},

///////////////////////////////////////////////////////// DIRECTION GIPEC ///////////////////////////////////////////////////////////////
{
  id : "a104cd83-fe51-4469-ab7b-56a04de87255",
  userName : "pdg_gipec.prp@holdingacs.dz",
  email : "pdg_gipec.prp@holdingacs.dz",
  normalizedUserName : "pdg_gipec.prp@holdingacs.dz",
  normalizedEmail : "pdg_gipec.prp@holdingacs.dz",
  passwordHash :
      await bcrypt.hash("Supportagent123@", 10),
  emailConfirmed : true,
  ACSHoldingId : "d2715ff4-e8c1-4b5b-b579-220dc4481b61"
},
{
  id : "01da7e65-e2b5-46b4-8010-f8dfe6e30e6c",
  userName : "manager_gipec.prp@holdingacs.dz",
  email : "manager_gipec.prp@holdingacs.dz",
  normalizedUserName : "manager_gipec.prp@holdingacs.dz",
  normalizedEmail : "manager_gipec.prp@holdingacs.dz",
  passwordHash :
      await bcrypt.hash("Supportagent123@", 10),
  emailConfirmed : true,
  ACSHoldingId : "d2715ff4-e8c1-4b5b-b579-220dc4481b61"
},
// F : ORAN SAC ////

{
  id : "355c3acd-c833-451c-83b9-3cf9bd6f93e1",
  userName : "pco_oransac.prp@holdingacs.dz",
  email : "pco_oransac.prp@holdingacs.dz",
  normalizedUserName : "pco_oransac.prp@holdingacs.dz",
  normalizedEmail : "pco_oransac.prp@holdingacs.dz",
  passwordHash :
      await bcrypt.hash("Supportagent123@", 10),
  emailConfirmed : true,
  ACSHoldingId : "009af9e4-cc71-4192-8659-7db9ab3c203e"
},

{
  id : "7f45d123-a5f8-40d4-bcd7-643f92b4f274",
  userName : "agent_oransac.prp@holdingacs.dz",
  email : "agent_oransac.prp@holdingacs.dz",
  normalizedUserName : "agent_oransac.prp@holdingacs.dz",
  normalizedEmail : "agent_oransac.prp@holdingacs.dz",
  passwordHash :
      await bcrypt.hash("Supportagent123@", 10),
  emailConfirmed : true,
  ACSHoldingId : "009af9e4-cc71-4192-8659-7db9ab3c203e"
},
// F : EMBAG ////

{
  id : "2cca32d4-7e20-4621-bd53-bb95601bab39",
  userName : "pco_embag.prp@holdingacs.dz",
  email : "pco_embag.prp@holdingacs.dz",
  normalizedUserName : "pco_embag.prp@holdingacs.dz",
  normalizedEmail : "pco_embag.prp@holdingacs.dz",
  passwordHash :
      await bcrypt.hash("Supportagent123@", 10),
  emailConfirmed : true,
  ACSHoldingId : "cb5c4ce7-45c3-46e9-af06-8d015f4e7ae1"
},

{
  id : "607892ce-5870-487f-88ee-2ff70ec74f73",
  userName : "agent_embag.prp@holdingacs.dz",
  email : "agent_embag.prp@holdingacs.dz",
  normalizedUserName : "agent_embag.prp@holdingacs.dz",
  normalizedEmail : "agent_embag.prp@holdingacs.dz",
  passwordHash :
      await bcrypt.hash("Supportagent123@", 10),
  emailConfirmed : true,
  ACSHoldingId : "cb5c4ce7-45c3-46e9-af06-8d015f4e7ae1"
},
// F : SACAR ////

{
  id : "21c8c620-7643-41fe-81ec-3604aa1a8302",
  userName : "pco_sacar.prp@holdingacs.dz",
  email : "pco_sacar.prp@holdingacs.dz",
  normalizedUserName : "pco_sacar.prp@holdingacs.dz",
  normalizedEmail : "pco_sacar.prp@holdingacs.dz",
  passwordHash :
      await bcrypt.hash("Supportagent123@", 10),
  emailConfirmed : true,
  ACSHoldingId : "72ad2da6-ff64-4d9d-aea4-1334cd4791a1"
},

{
  id : "ccecb55d-8f82-4d40-80c8-71bd09c3adb0",
  userName : "agent_sacar.prp@holdingacs.dz",
  email : "agent_sacar.prp@holdingacs.dz",
  normalizedUserName : "agent_sacar.prp@holdingacs.dz",
  normalizedEmail : "agent_sacar.prp@holdingacs.dz",
  passwordHash :
      await bcrypt.hash("Supportagent123@", 10),
  emailConfirmed : true,
  ACSHoldingId : "72ad2da6-ff64-4d9d-aea4-1334cd4791a1"
},
////////////////////////////////////////////////////////////////////////////

//////////////////////////// EPE ENAP /////////////////////////////////////////////////////////
///////////// PDG ENAP //////////////////////////////////////
{
  id: "1911afb8-fa58-46a5-9aee-e4eedf37aebb",
  userName: "pdg_enap.prp@holdingacs.dz",
  email: "pdg_enap.prp@holdingacs.dz",
  normalizedusername: "pdg_enap.prp@holdingacs.dz",
  normalizedemail: "pdg_enap.prp@holdingacs.dz",
  passwordHash: await bcrypt.hash("Supportagent123@", 10),
  emailconfirmed: true,
  ACSHoldingId: "3c7a0482-2aa8-43fb-bff5-b4071484dd39"
},
////////////////////// PCO ENAP ////////////////////////////
{
    id: "d9966ae9-8afb-4ad0-b77d-cb908a0163b9",
    userName: "pco_enap.prp@holdingacs.dz",
    email: "pco_enap.prp@holdingacs.dz",
    normalizedusername: "pco_enap.prp@holdingacs.dz",
    normalizedemail: "pco_enap.prp@holdingacs.dz",
    passwordHash: await bcrypt.hash("Supportagent123@", 10),
    emailconfirmed: true,
    ACSHoldingId: "3c7a0482-2aa8-43fb-bff5-b4071484dd39"
},
///////////////// AGENT ENAP //////////////////////////////
{
    id: "a0801bbb-1590-46be-b810-d7101a76953b",
    userName: "agent_enap.prp@holdingacs.dz",
    email: "agent_enap.prp@holdingacs.dz",
    normalizedusername: "agent_enap.prp@holdingacs.dz",
    normalizedemail: "agent_enap.prp@holdingacs.dz",
    passwordHash: await bcrypt.hash("Supportagent123@", 10),
    emailconfirmed: true,
    ACSHoldingId: "3c7a0482-2aa8-43fb-bff5-b4071484dd39"
},
///////////////////////////////////////////////////////// EPE SOCOTHYD ///////////////////////////////////////
/////////////////////// PDG SOCOTHYD ///////////////////////////
{
  id: "9e679c51-d1af-44bf-9255-a7ac980fdf43",
  userName: "pdg_socothyd.prp@holdingacs.dz",
  email: "pdg_socothyd.prp@holdingacs.dz",
  normalizedusername: "pdg_socothyd.prp@holdingacs.dz",
  normalizedemail: "pdg_socothyd.prp@holdingacs.dz",
  passwordHash: await bcrypt.hash("Supportagent123@", 10),
  emailconfirmed: true,
  ACSHoldingId: "64b7d137-3969-46db-87dd-c1b77e7e0081"
},
///////////////////// pco socothyd /////////////////////////////
{
    id: "47334429-495a-471a-af17-cc198809b83f",
    userName: "pco_socothyd.prp@holdingacs.dz",
    email: "pco_socothyd.prp@holdingacs.dz",
    normalizedusername: "pco_socothyd.prp@holdingacs.dz",
    normalizedemail: "pco_socothyd.prp@holdingacs.dz",
    passwordHash: await bcrypt.hash("Supportagent123@", 10),
    emailconfirmed: true,
    ACSHoldingId: "64b7d137-3969-46db-87dd-c1b77e7e0081"
  },
  /////////////////// AGENT SOCOTHYD ///////////////////////////
  {
    id: "0a6ce8df-a911-4714-a0b6-7cdf7f156594",
    userName: "agent_socothyd.prp@holdingacs.dz",
    email: "agent_socothyd.prp@holdingacs.dz",
    normalizedusername: "agent_socothyd.prp@holdingacs.dz",
    normalizedemail: "agent_socothyd.prp@holdingacs.dz",
    passwordHash: await bcrypt.hash("Supportagent123@", 10),
    emailconfirmed: true,
    ACSHoldingId: "64b7d137-3969-46db-87dd-c1b77e7e0081"
  },
  //////////////////////////////////////////////////////////////////////////////////// DIPROCHIM ////////////////////////////////////////////////////
  {
    id: "5a80423c-9f8b-44d8-9ab9-3ccde31e7947",
    userName: "pco_diprochim.prp@holdingacs.dz",
    email: "pco_diprochim.prp@holdingacs.dz",
    normalizedusername: "pco_diprochim.prp@holdingacs.dz",
    normalizedemail: "pco_diprochim.prp@holdingacs.dz",
    passwordHash: await bcrypt.hash("Supportagent123@", 10),
    emailconfirmed: true,
    ACSHoldingId: "d50d846f-7860-47cb-81c2-57b3434a3d09"
  },
  {
    id: "1fb2bff2-8f65-4af8-959c-af715028f491",
    userName: "agent_diprochim.prp@holdingacs.dz",
    email: "agent_diprochim.prp@holdingacs.dz",
    normalizedusername: "agent_diprochim.prp@holdingacs.dz",
    normalizedemail: "agent_diprochim.prp@holdingacs.dz",
    passwordHash: await bcrypt.hash("Supportagent123@", 10),
    emailconfirmed: true,
    ACSHoldingId: "d50d846f-7860-47cb-81c2-57b3434a3d09"
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////// EPE TONIC ////////////////////////////////////////////
  {
    id: "ede5d234-febd-4de8-917b-72848a29d6dd",
    userName: "pdg_tonic.prp@holdingacs.dz",
    email: "pdg_tonic.prp@holdingacs.dz",
    normalizedusername: "pdg_tonic.prp@holdingacs.dz",
    normalizedemail: "pdg_tonic.prp@holdingacs.dz",
    passwordHash: await bcrypt.hash("Supportagent123@", 10),
    emailconfirmed: true,
    ACSHoldingId: "a5cc1fc0-7fc7-4aa9-a72f-519081d22057"
  },
  {
    id: "99566f71-a880-4a80-8365-a8987b49b829",
    userName: "pco_tonic.prp@holdingacs.dz",
    email: "pco_tonic.prp@holdingacs.dz",
    normalizedusername: "pco_tonic.prp@holdingacs.dz",
    normalizedemail: "pco_tonic.prp@holdingacs.dz",
    passwordHash: await bcrypt.hash("Supportagent123@", 10),
    emailconfirmed: true,
    ACSHoldingId: "a5cc1fc0-7fc7-4aa9-a72f-519081d22057"
  },
  {
    id: "9a0bb52a-ee57-4b6a-a4d6-77014dd94c36",
    userName: "agent_tonic.prp@holdingacs.dz",
    email: "agent_tonic.prp@holdingacs.dz",
    normalizedusername: "agent_tonic.prp@holdingacs.dz",
    normalizedemail: "agent_tonic.prp@holdingacs.dz",
    passwordHash: await bcrypt.hash("Supportagent123@", 10),
    emailconfirmed: true,
    ACSHoldingId: "a5cc1fc0-7fc7-4aa9-a72f-519081d22057"
  },
  //////////////////////////////////////////////////////////////// EPE 3R SANTE //////////////////////////////////////////////
  {
    id: "5ad1bb1b-8894-4fdd-b5c9-ff6e6a1a831e",
    userName: "pco_3r_sante.prp@holdingacs.dz",
    email: "pco_3r_sante.prp@holdingacs.dz",
    normalizedusername: "pco_3r_sante.prp@holdingacs.dz",
    normalizedemail: "pco_3r_sante.prp@holdingacs.dz",
    passwordHash: await bcrypt.hash("Supportagent123@", 10),
    emailconfirmed: true,
    ACSHoldingId: "76C45C3A-7BE6-491F-B08F-409E80854AED"
  },
  {
    id: "65b19013-7703-4650-99b1-62ffcb60dbdd",
    userName: "agent_3r_sante.prp@holdingacs.dz",
    email: "agent_3r_sante.prp@holdingacs.dz",
    normalizedusername: "agent_3r_sante.prp@holdingacs.dz",
    normalizedemail: "agent_3r_sante.prp@holdingacs.dz",
    passwordHash: await bcrypt.hash("Supportagent123@", 10),
    emailconfirmed: true,
    ACSHoldingId: "76C45C3A-7BE6-491F-B08F-409E80854AED"
  },
  ////////////////////////////////////////////////// EPE EN-DIMED ////////////////////////////////////////////////////////////
  {
    id: "1a0d59a7-a943-47a2-9d5e-269c2441ad80",
    userName: "pdg_endimed.prp@holdingacs.dz",
    email: "pdg_endimed.prp@holdingacs.dz",
    normalizedusername: "pdg_endimed.prp@holdingacs.dz",
    normalizedemail: "pdg_endimed.prp@holdingacs.dz",
    passwordHash: await bcrypt.hash("Supportagent123@", 10),
    emailconfirmed: true,
    ACSHoldingId: "e8b85c8a-83b5-4646-bc74-b0b1b8cb8778"
  },
  {
    id: "1a0d59a7-a943-47a2-9d5e-269c2441ad80",
    userName: "pco_endimed.prp@holdingacs.dz",
    email: "pco_endimed.prp@holdingacs.dz",
    normalizedusername: "pco_endimed.prp@holdingacs.dz",
    normalizedemail: "pco_endimed.prp@holdingacs.dz",
    passwordHash: await bcrypt.hash("Supportagent123@", 10),
    emailconfirmed: true,
    ACSHoldingId: "e8b85c8a-83b5-4646-bc74-b0b1b8cb8778"
  },
  {
    id: "775f6644-4fa3-4b92-adeb-b05287e26e93",
    userName: "agent_endimed.prp@holdingacs.dz",
    email: "agent_endimed.prp@holdingacs.dz",
    normalizedusername: "agent_endimed.prp@holdingacs.dz",
    normalizedemail: "agent_endimed.prp@holdingacs.dz",
    passwordHash: await bcrypt.hash("Supportagent123@", 10),
    emailconfirmed: true,
    ACSHoldingId: "e8b85c8a-83b5-4646-bc74-b0b1b8cb8778"
  }
/////////////////////////////////////////////////////////////////
    


          ];
          

        for (const user of applicationUsers) {
             
                await this.appUsersRepository.save(user);
            
        }
    
    }
    private async seedAppUsersRoles() {
        const appUsersRoles =  [
            // ACS PDG
            { userId: "3cbf3570-0d44-4673-8746-29b7cf568093", roleId: "1" },
            // ACS MANAGER BOUIDER
            { userId: "635dfbf8-fadb-4aa0-87f2-790fe9d4282b", roleId: "2" },
            
            // ENAD GROUPE
            // SHYMECA
            { userId: "d466ef00-61f1-4e77-801a-b016f0f12323", roleId: "3" },
            { userId: "f6654d1d-3921-45ac-9079-bfb1bffe100c", roleId: "4" },
            
            // vivaplast
            { userId: "e2007573-a278-4c45-8a9d-e54619c54877", roleId: "3" },
            { userId: "4c9e6347-7775-4073-aad6-8789102fd0d7", roleId: "4" },
            
            // plastunion
            { userId: "af084d89-041a-448c-a848-57ce37c1cb83", roleId: "3" },
            { userId: "a10b90ea-a553-4142-8569-6088741d806e", roleId: "4" },
            
            // manager ENAD
            { userId: "1f030c86-fbd5-4a9b-82f9-48b1ce05f86e", roleId: "5" },
            { userId: "56d78de8-2c58-40bc-b6ad-5b89dd0266f5", roleId: "5" },
            // EPE endimed
            { userId: "1a0d59a7-a943-47a2-9d5e-269c2441ad80", roleId: "3" },
        
            // EPE 3R-SANTE
            { userId: "5ad1bb1b-8894-4fdd-b5c9-ff6e6a1a831e", roleId: "3" },
            { userId: "65b19013-7703-4650-99b1-62ffcb60dbdd", roleId: "4" },
        
            // EPE TONIC
            { userId: "99566f71-a880-4a80-8365-a8987b49b829", roleId: "3" },
            { userId: "9a0bb52a-ee57-4b6a-a4d6-77014dd94c36", roleId: "4" },


            //EPE SOCOTHYD 
            { userId: "47334429-495a-471a-af17-cc198809b83f", roleId: "3" },
            { userId: "0a6ce8df-a911-4714-a0b6-7cdf7f156594", roleId: "4" },
            {userId:"9e679c51-d1af-44bf-9255-a7ac980fdf43" , roleId:"5"},
            // EPE DIPROCHIM
            { userId: "5a80423c-9f8b-44d8-9ab9-3ccde31e7947", roleId: "3" },
            { userId: "1fb2bff2-8f65-4af8-959c-af715028f491", roleId: "4" },
        
            // GROUPE enava
            { userId: "4ca45d67-a4d2-42d1-bf8f-112ab8e7fd93", roleId: "3" },
            { userId: "7f45d123-a5f8-40d4-bcd7-643f92b4f274", roleId: "4" },
            { userId: "bbdc1a7f-416f-4e64-8c5a-7f631d6bda4c", roleId: "3" },
            { userId: "8f2d32b3-ae1a-472b-bf2c-5b2f35d1fa6d", roleId: "4" },
            { userId: "f86c1381-9166-47b3-a058-4433da09471e", roleId: "3" },
            { userId: "3db647be-2f24-46dc-91e3-cf26a6854ce6", roleId: "4" },
            { userId: "5ebfdf0f-5f00-4ad1-a974-cea9bb146f94", roleId: "3" },
            { userId: "973abde4-a60c-4010-8e8d-d9ada52f0cb8", roleId: "5" },
            { userId: "b3354ef0-7055-4772-8e69-63daa31eaa6c", roleId: "5" },

          // GIPEC 
          { userId: "a104cd83-fe51-4469-ab7b-56a04de87255", roleId: "5" },
          { userId: "01da7e65-e2b5-46b4-8010-f8dfe6e30e6c", roleId: "5" },
          { userId: "355c3acd-c833-451c-83b9-3cf9bd6f93e1", roleId: "3" },
          { userId: "e5672901-15c7-4d7c-8585-ff995e86511e", roleId: "4" },
          { userId: "2cca32d4-7e20-4621-bd53-bb95601bab39", roleId: "3" },
          { userId: "607892ce-5870-487f-88ee-2ff70ec74f73", roleId: "4" },
          { userId: "21c8c620-7643-41fe-81ec-3604aa1a8302", roleId: "3" },
          { userId: "ccecb55d-8f82-4d40-80c8-71bd09c3adb0", roleId: "4" },
            // EPE ENAP
            { userId: "d9966ae9-8afb-4ad0-b77d-cb908a0163b9", roleId: "3" },
            { userId: "a0801bbb-1590-46be-b810-d7101a76953b", roleId: "4" },
            { userId:"1911afb8-fa58-46a5-9aee-e4eedf37aebb",  roleId:"5"  },
            // ENPC
            { userId: "12345678-0001-0001-0001-000000000001", roleId: "3" },
            { userId: "22345678-0001-0001-0001-000000000002", roleId: "4" },
            { userId: "33345678-0001-0001-0001-000000000003", roleId: "3" },
            { userId: "44345678-0001-0001-0001-000000000004", roleId: "4" },
            { userId: "55345678-0001-0001-0001-000000000005", roleId: "3" },
            { userId: "66345678-0001-0001-0001-000000000006", roleId: "4" },
            { userId: "50d44d53-7ba6-4657-b124-7edaf6d5a1c9", roleId: "3" },
            { userId: "938573c9-6b5b-4e18-912a-9c76bb027d9d", roleId: "3" },
            { userId: "0a1b635d-d71b-4391-8e9e-1d94ad3a291d", roleId: "4" },
            { userId: "d7a5fd82-82d3-4f12-935d-7d84f8c9d912", roleId: "3" },
            { userId: "78bfc9f1-7273-4c58-a115-3cdbbd78b137", roleId: "4" },
            { userId: "35b6259e-a9f6-4297-aef7-e20a56f73f34", roleId: "3" },
            { userId: "5ebfdf0f-5f00-4ad1-a974-cea9bb146f94", roleId: "4" },
            { userId: "819b2929-730b-4a13-8050-632967cebb9f", roleId: "3" },
            { userId: "d5134f9d-7f19-4743-b90d-5d6af5cc1fb7", roleId: "3" },
            { userId: "3bb34b83-63f3-4b80-8de5-e708b70c2d6f", roleId: "4" },
            { userId: "21a987f7-d5f5-46a7-bc3a-598017367927", roleId: "3" },
            { userId: "0a482afe-ffbd-4ac6-b0c1-6b4cca1e747a", roleId: "5" },
            { userId:  "89348ac8-7c71-4df3-8cdb-ef68d2e715fc" , roleId :"5"}
        ];
        
        for (const ur of appUsersRoles) {
           // Fetch the actual user and role entities from the database
const user = await this.appUsersRepository.findOne({ where: { id: ur.userId } });
const role = await this.roleRepository.findOne({ where: { id: ur.roleId } });

 // Check if the user-role combination already exists
 const existingUserRole = await this.appUsersRolesRepository.findOne({ where: { user, applicationRole: role } });

 if (!existingUserRole) {
     // Create and save the new user-role record
     const userRole = new ApplicationUserRole();
     userRole.user = user;
     userRole.applicationRole = role;
     await this.appUsersRolesRepository.save(userRole);
 } else {
 }


        }
    }
}
