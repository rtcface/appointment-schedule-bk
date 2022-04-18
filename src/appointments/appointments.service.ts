import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppointmentsRegisterDto } from './dtos';
import { AppointmentsRegisterInput } from './inputs';

@Injectable()
export class AppointmentsService {

    constructor(@InjectModel ('Appointment') private readonly appointmentModel: Model<AppointmentsRegisterDto>){ }


    async register (inputAppointment: AppointmentsRegisterInput): Promise<AppointmentsRegisterDto> {
        const createdAppointment = new this.appointmentModel(inputAppointment);
        return await createdAppointment.save();
    }

    async getAppointments(): Promise<AppointmentsRegisterDto[]> {
        const appointments = await this.appointmentModel.find().exec();
        return appointments;
    }

    async findAppointmentById(id: string): Promise<AppointmentsRegisterDto> {
        return await this.appointmentModel.findById(id);
    }

    async findAppointmentByDate(date: string): Promise<AppointmentsRegisterDto> {
        return await this.appointmentModel.findOne({date:date});
    }

    async updateAppointment(appointment: AppointmentsRegisterDto): Promise<AppointmentsRegisterDto> {
        return await this.appointmentModel.findByIdAndUpdate(appointment.id, appointment, {new: true});
    }

    async cancelAppointment(id: string): Promise<AppointmentsRegisterDto> {
        return await this.appointmentModel.findByIdAndUpdate(id, {status: 'canceled', updateAt:Date.now }, {new: true});
    }

    async confimeAppointment(id: string): Promise<AppointmentsRegisterDto> {
        return await this.appointmentModel.findByIdAndUpdate(id, {status: 'confirmed', updateAt:Date.now }, {new: true});
    }

    //returns true if the appointment is not in the past
    async isAppointmentValid(appointment: AppointmentsRegisterInput): Promise<boolean> {
        const now = new Date();
        const appointmentDate = new Date(appointment.date);
        return appointmentDate > now;
    }

    async isAppointmentAvailable(appointment: AppointmentsRegisterInput): Promise<boolean> {
        const appointmentDate = new Date(appointment.date);
        const appointmentFound = await this.appointmentModel.findOne({date: appointmentDate});
        return !appointmentFound;
    }

    // return disponibility of the provider
    async isProviderAvailable(appointment: AppointmentsRegisterInput): Promise<boolean> {
        const appointmentDate = new Date(appointment.date);
        const appointmentFound = await this.appointmentModel.findOne({provider: appointment.provider, date: appointmentDate});
        return !appointmentFound;
    }

    // return a list of appointments of the provider

    async getAppointmentsByProvider(provider: string): Promise<AppointmentsRegisterDto[]> {
        return await this.appointmentModel.find({provider: provider});
    }

    // return a list of appointments of the user

    async getAppointmentsByUser(user: string): Promise<AppointmentsRegisterDto[]> {
        return await this.appointmentModel.find({user: user});
    }

    // return available appointments for the user
    async getAvailableAppointmentsByUser(user: string): Promise<AppointmentsRegisterDto[]> {
        const appointments = await this.getAppointmentsByUser(user);
        const now = new Date();
        const availableAppointments = appointments.filter(appointment => {
            const appointmentDate = new Date(appointment.date);
            return appointmentDate > now;
        });
        return availableAppointments;
    }

    // return available appointments for the provider
    async getAvailableAppointmentsByProvider(provider: string): Promise<AppointmentsRegisterDto[]> {

        const appointments = await this.getAppointmentsByProvider(provider);
        const now = new Date();
        const availableAppointments = appointments.filter(appointment => {
            const appointmentDate = new Date(appointment.date);
            return appointmentDate > now;
        });
        return availableAppointments;
    }

    // return a list of appointments of the user and provider

    async getAppointmentsByUserAndProvider(user: string, provider: string): Promise<AppointmentsRegisterDto[]> {
        return await this.appointmentModel.find({user: user, provider: provider});
    }

    // return available hours for the provider

    async getAvailableHoursByProvider(provider: string): Promise<AppointmentsRegisterDto[]> {
        const appointments = await this.getAppointmentsByProvider(provider);
        const now = new Date();
        const availableAppointments = appointments.filter(appointment => {
            const appointmentDate = new Date(appointment.date);
            return appointmentDate > now;
        });
        return availableAppointments;
    }

    // create a list of available hours for the provider

    async getAvailableHoursByProviderAndDate(provider: string, date: string): Promise<AppointmentsRegisterDto[]> {
        const appointments = await this.getAppointmentsByProvider(provider);
        const now = new Date();
        const availableAppointments = appointments.filter(appointment => {
            const appointmentDate = new Date(appointment.date);
            return appointmentDate > now;
        });
        return availableAppointments;
    }

    // create a list of appointments by day and opening hours

    async getAppointmentsByDayAndOpeningHours(day: string, openingHours: string): Promise<AppointmentsRegisterDto[]> {
        const appointments = await this.getAppointments();
        const now = new Date();
        const availableAppointments = appointments.filter(appointment => {
            const appointmentDate = new Date(appointment.date);
            return appointmentDate > now;
        });
        return availableAppointments;
    }






}
