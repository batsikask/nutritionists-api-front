import { Routes } from '@angular/router';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { HomeComponent } from './components/home/home.component';
import { NutritionistProfileComponent } from './components/nutritionist/nutritionist-profile/nutritionist-profile.component';
import { StaffProfileComponent } from './components/staff/staff-profile/staff-profile.component';
import { NormalUserProfileComponent } from './components/normal-user/normal-user-profile/normal-user-profile.component';
import { NormalUserNutritionistListComponent } from './components/normal-user/normal-user-nutritionist-list/normal-user-nutritionist-list.component';
import { NormalUserNutritionistsDetailsComponent } from './components/normal-user/normal-user-nutritionists-details/normal-user-nutritionists-details.component';
import { NormalUserBodyMeasurementListComponent } from './components/normal-user/measurements/body/normal-user-body-measurement-list/normal-user-body-measurement-list.component';
import { NormalUserBodyMeasurementDetailsComponent } from './components/normal-user/measurements/body/normal-user-body-measurement-details/normal-user-body-measurement-details.component';
import { NormalUserBiochemicalMeasurementDetailsComponent } from './components/normal-user/measurements/biochemical/normal-user-biochemical-measurement-details/normal-user-biochemical-measurement-details.component';
import { NormalUserBiochemicalMeasurementListComponent } from './components/normal-user/measurements/biochemical/normal-user-biochemical-measurement-list/normal-user-biochemical-measurement-list.component';
import { NormalUserDietDetailsComponent } from './components/normal-user/diet/normal-user-diet-details/normal-user-diet-details.component';
import { NormalUserDietListComponent } from './components/normal-user/diet/normal-user-diet-list/normal-user-diet-list.component';
import { NormalUserSegmentalBodyMeasurementDetailsComponent } from './components/normal-user/measurements/segmental/normal-user-segmental-body-measurement-details/normal-user-segmental-body-measurement-details.component';
import { NormalUserSegmentalBodyMeasurementListComponent } from './components/normal-user/measurements/segmental/normal-user-segmental-body-measurement-list/normal-user-segmental-body-measurement-list.component';
import { NutritionistClientListComponent } from './components/nutritionist/client/nutritionist-client-list/nutritionist-client-list.component';
import { NutritionistClientDetailsComponent } from './components/nutritionist/client/nutritionist-client-details/nutritionist-client-details.component';
import { NutritionistClientBodyMeasurementDetailsComponent } from './components/nutritionist/client-measurements/body/nutritionist-client-body-measurement-details/nutritionist-client-body-measurement-details.component';
import { NutritionistClientSegmentalBodyMeasurementListComponent } from './components/nutritionist/client-measurements/segmental/nutritionist-client-segmental-body-measurement-list/nutritionist-client-segmental-body-measurement-list.component';
import { NutritionistClientSegmentalBodyMeasurementDetailsComponent } from './components/nutritionist/client-measurements/segmental/nutritionist-client-segmental-body-measurement-details/nutritionist-client-segmental-body-measurement-details.component';
import { NutritionistClientBiochemicalMeasurementListComponent } from './components/nutritionist/client-measurements/biochemical/nutritionist-client-biochemical-measurement-list/nutritionist-client-biochemical-measurement-list.component';
import { NutritionistClientBiochemicalMeasurementDetailsComponent } from './components/nutritionist/client-measurements/biochemical/nutritionist-client-biochemical-measurement-details/nutritionist-client-biochemical-measurement-details.component';
import { NutritionistClientDiseaseDetailsComponent } from './components/nutritionist/client-measurements/disease/nutritionist-client-disease-details/nutritionist-client-disease-details.component';
import { NutritionistClientDiseaseListComponent } from './components/nutritionist/client-measurements/disease/nutritionist-client-disease-list/nutritionist-client-disease-list.component';
import { NutritionistClientDietListComponent } from './components/nutritionist/client-measurements/diet/nutritionist-client-diet-list/nutritionist-client-diet-list.component';
import { NutritionistClientDietDetailsComponent } from './components/nutritionist/client-measurements/diet/nutritionist-client-diet-details/nutritionist-client-diet-details.component';
import { StaffActionsComponent } from './components/staff/actions/staff-actions/staff-actions.component';
import { AllUsersListComponent } from './components/staff/all-users-list/all-users-list.component';
import { AllNormalUsersListComponent } from './components/staff/all-normal-users-list/all-normal-users-list.component';
import { AllNutritionistsListComponent } from './components/staff/all-nutritionists-list/all-nutritionists-list.component';
import { NutritionistClientBodyMeasurementListComponent } from './components/nutritionist/client-measurements/body/nutritionist-client-body-measurement-list/nutritionist-client-body-measurement-list.component';
import { NutritionistClientCreateComponent } from './components/nutritionist/client/nutritionist-client-create/nutritionist-client-create.component';
import { authGuard } from './shared/guards/auth.guard';
import { nutritionistGuard } from './shared/guards/nutritionist.guard';
import { staffGuard } from './shared/guards/staff.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { normaluserGuard } from './shared/guards/normaluser.guard';
import { NutritionistClientEditComponent } from './components/nutritionist/client/nutritionist-client-edit/nutritionist-client-edit.component';
import { NutritionistClientBodyMeasurementEditComponent } from './components/nutritionist/client-measurements/body/nutritionist-client-body-measurement-edit/nutritionist-client-body-measurement-edit.component';
import { NutritionistClientSegmentalBodyMeasurementEditComponent } from './components/nutritionist/client-measurements/segmental/nutritionist-client-segmental-body-measurement-edit/nutritionist-client-segmental-body-measurement-edit.component';
import { NutritionistClientBiochemicalMeasurementEditComponent } from './components/nutritionist/client-measurements/biochemical/nutritionist-client-biochemical-measurement-edit/nutritionist-client-biochemical-measurement-edit.component';
import { NutritionistClientDiseaseEditComponent } from './components/nutritionist/client-measurements/disease/nutritionist-client-disease-edit/nutritionist-client-disease-edit.component';
import { NutritionistClientDietEditComponent } from './components/nutritionist/client-measurements/diet/nutritionist-client-diet-edit/nutritionist-client-diet-edit.component';
import { UserMeasurementsComponent } from './components/normal-user/user-measurements/user-measurements.component';
import { ClientMeasurementsComponent } from './components/nutritionist/client-measurements/client-measurements/client-measurements.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about' , component: AboutComponent},
    { path: 'login', component: UserLoginComponent },
    { path: 'register', component: UserRegisterComponent },
    { path: 'user/profile', component: NormalUserProfileComponent, canActivate: [authGuard, normaluserGuard] },
    { path: 'user/nutritionists', component: NormalUserNutritionistListComponent, canActivate: [authGuard, normaluserGuard] },
    { path: 'user/nutritionists/:nutritionistId', component: NormalUserNutritionistsDetailsComponent, canActivate: [authGuard, normaluserGuard] },
    { path: 'user/measurements', component: UserMeasurementsComponent, canActivate: [authGuard, normaluserGuard] },
    { path: 'user/measurements/body', component: NormalUserBodyMeasurementListComponent, canActivate: [authGuard, normaluserGuard] },
    { path: 'user/measurements/body/:measurementId', component: NormalUserBodyMeasurementDetailsComponent, canActivate: [authGuard, normaluserGuard] },
    { path: 'user/measurements/segmental', component: NormalUserSegmentalBodyMeasurementListComponent, canActivate: [authGuard, normaluserGuard] },
    { path: 'user/measurements/segmental/:measurementId', component: NormalUserSegmentalBodyMeasurementDetailsComponent, canActivate: [authGuard, normaluserGuard] },
    { path: 'user/measurements/biochemical', component: NormalUserBiochemicalMeasurementListComponent, canActivate: [authGuard, normaluserGuard] },
    { path: 'user/measurements/biochemical/:measurementId', component: NormalUserBiochemicalMeasurementDetailsComponent, canActivate: [authGuard, normaluserGuard] },
    { path: 'user/diets', component: NormalUserDietListComponent, canActivate: [authGuard, normaluserGuard] },
    { path: 'user/diets/:dietId', component: NormalUserDietDetailsComponent, canActivate: [authGuard, normaluserGuard] },
    { path: 'nutritionist/profile', component: NutritionistProfileComponent, canActivate: [authGuard, nutritionistGuard] },
    { path: 'nutritionist/clients', component: NutritionistClientListComponent, canActivate: [authGuard, nutritionistGuard] },
    { path: 'nutritionist/clients/create', component: NutritionistClientCreateComponent, canActivate: [authGuard, nutritionistGuard] },
    { path: 'nutritionist/clients/:clientId/edit', component: NutritionistClientEditComponent, canActivate: [authGuard, nutritionistGuard]},
    { path: 'nutritionist/clients/:clientId', component: NutritionistClientDetailsComponent, canActivate: [authGuard, nutritionistGuard], 
        children: [
            { path: 'measurements', component: ClientMeasurementsComponent },
            { path: 'measurements/body', component: NutritionistClientBodyMeasurementListComponent },
            { path: 'measurements/body/:measurementId', component: NutritionistClientBodyMeasurementDetailsComponent, 
                children: [
                    { path: 'edit', component: NutritionistClientBodyMeasurementEditComponent, outlet: 'editOutlet' }
                ]
             },
            { path: 'measurements/segmental', component: NutritionistClientSegmentalBodyMeasurementListComponent },
            { path: 'measurements/segmental/:measurementId', component: NutritionistClientSegmentalBodyMeasurementDetailsComponent, 
                children: [
                    { path: 'edit', component: NutritionistClientSegmentalBodyMeasurementEditComponent, outlet: 'editOutlet' }
                ]
            },
            { path: 'measurements/biochemical', component: NutritionistClientBiochemicalMeasurementListComponent },
            { path: 'measurements/biochemical/:measurementId', component: NutritionistClientBiochemicalMeasurementDetailsComponent, 
                children: [
                    { path: 'edit', component: NutritionistClientBiochemicalMeasurementEditComponent, outlet: 'editOutlet' }
                ]
            },
            { path: 'diseases', component: NutritionistClientDiseaseListComponent },
            { path: 'diseases/:diseaseId', component: NutritionistClientDiseaseDetailsComponent, 
                children: [
                    { path: 'edit', component: NutritionistClientDiseaseEditComponent, outlet: 'editOutlet' }
                ]
            },
            { path: 'diets', component: NutritionistClientDietListComponent },
            { path: 'diets/:dietId', component: NutritionistClientDietDetailsComponent, 
                children: [
                    { path: 'edit', component: NutritionistClientDietEditComponent, outlet: 'editOutlet' }
                ]
            },
        ]
    },
    
    { path: 'staff/profile', component: StaffProfileComponent, canActivate: [authGuard, staffGuard] },
    { path: 'staff/actions', component: StaffActionsComponent, canActivate: [authGuard, staffGuard] },
    { path: 'staff/actions/users', component: AllUsersListComponent, canActivate: [authGuard, staffGuard] },
    { path: 'staff/actions/normal-users', component: AllNormalUsersListComponent, canActivate: [authGuard, staffGuard] },
    { path: 'staff/actions/nutritionists', component: AllNutritionistsListComponent, canActivate: [authGuard, staffGuard] },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: '**', redirectTo: '' }
];