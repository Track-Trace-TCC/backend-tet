import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { DriversService } from "src/drivers/drivers.service";

@Processor('new-points')
export class NewPointsJob {
    constructor(private driverService: DriversService) { }
    @Process()
    async handle(job: Job<{ route_id: string; driver_id: string; lat: number; lng: number }>) {
        const { driver_id, lat, lng } = job.data;
        await this.driverService.updateDriverLocation(driver_id, lat, lng);
        return {}
    }
}