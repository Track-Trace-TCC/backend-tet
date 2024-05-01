import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { AuthGuard } from '@nestjs/passport';
@Controller('report')
@ApiTags('Relatórios')
export class ReportController {
    constructor(
        private reportService: ReportService
    ) { }

    @Get()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @ApiBearerAuth('access-token')
    async getDashboardReport() {
        return this.reportService.getDashboardReport();
    }
}

