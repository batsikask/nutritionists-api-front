export interface BodyMeasurement {
    id: number,
    user_id: number,
    client_id: number,
    weight: number,
    height: number,
    age: number,
    bmr: number,
    bmi: number,
    body_fat_percentage: number,
    body_fat_mass: number,
    fat_free_mass: number,
    muscle_mass: number,
    bone_mass: number,
    body_water_percentage: number,
    body_water_weight: number,
    visceral_fat_level: number,
    metabolic_age: number,
    physical_activity_level: number,
    physique_rating: number,
    date: Date,
}

export interface SegmentalBodyMeasurement {
    id: number,
    user_id: number,
    client_id: number,
    trunk_muscle: number,
    left_arm_muscle: number,
    right_arm_muscle: number,
    left_leg_muscle: number,
    right_leg_muscle: number,
    trunk_fat: number,
    left_arm_fat: number,
    right_arm_fat: number,
    left_leg_fat: number,
    right_leg_fat: number,
    date: string,
}

export interface BiochemicalMeasurement {
    id: number,
    user_id: number,
    client_id: number,
    glucose: number,
    chlosterol: number,
    triglycerides: number,
    hdl: number,
    ldl: number,
    creatinine: number,
    urea: number,
    uric_acid: number,
    hemoglobin: number,
    hematocrit: number,
    white_blood_cell_count: number,
    red_blood_cell_count: number,
    platelet_count: number,
    calcium: number,
    sodium: number,
    potassium: number,
    chloride: number,
    iron: number,
    ferritin: number,
    alanine_aminotransferase: number,
    aspartate_aminotransferase: number,
    alkaline_phosphatase: number,
    bilirubin: number,
    albumin: number,
    total_protein: number,
    thyroid_stimulating_hormone: number,
    thyroxine: number,
    triiodothyronine: number,
    c_reactive_protein: number,
    lactate_dehydrogenase: number,
    vitamin_a: number,
    vitamin_b12: number,
    vitamin_c: number,
    vitamin_d: number,
    vitamin_e: number,
    vitamin_k: number,
    date: string,
}

export interface Diseases {
    id: number,
    user_id: number,
    client_id: number,
    past_diseases: string,
    past_medications: string,
    current_diseases: string,
    current_medications: string,
    family_history: string,
    allergies: string,
    dysanexias: string,
    food_restrictions: string,
    comments: string,
    date: string,
}

export interface Diet {
    id: number,
    user_id: number,
    client_id: number,
    nutritionist_id: number,
    preffered_foods: string,
    disliked_foods: string,
    activity_level: string,
    weight_goal: string,
    fat: number,
    protein: number,
    carbohydrates: number,
    diet: string,
    comments: string,
    date: string,
}