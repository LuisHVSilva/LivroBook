import {container} from "tsyringe";
import {Database} from "../database";
import {Sequelize} from "sequelize-typescript";

container.registerInstance(Sequelize, Database.getInstance());

export {container};