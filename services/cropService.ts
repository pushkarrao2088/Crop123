import { supabase } from './supabaseClient';
import { CropProfile } from '../types';

export const cropService = {
  async getCropProfiles(): Promise<CropProfile[]> {
    try {
      const { data, error } = await supabase
        .from('crop_profiles')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;

      return (data || []).map((crop: any) => ({
        name: crop.name,
        season: crop.season,
        duration: crop.duration_days?.toString() || '',
        pests: crop.common_pests || [],
        image: crop.image || ''
      }));
    } catch (error) {
      console.error('Error fetching crops:', error);
      return [];
    }
  },

  async getCropByName(name: string): Promise<CropProfile | null> {
    try {
      const { data, error } = await supabase
        .from('crop_profiles')
        .select('*')
        .eq('name', name)
        .maybeSingle();

      if (error) throw error;

      if (!data) return null;

      return {
        name: data.name,
        season: data.season,
        duration: data.duration_days?.toString() || '',
        pests: data.common_pests || [],
        image: data.image || ''
      };
    } catch (error) {
      console.error('Error fetching crop:', error);
      return null;
    }
  },

  async getFieldScans(userId: string) {
    try {
      const { data, error } = await supabase
        .from('field_scans')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching field scans:', error);
      return [];
    }
  },

  async saveFieldScan(userId: string, imageUrl: string, analysisResult: string, riskLevel: string = 'Low') {
    try {
      const { data, error } = await supabase
        .from('field_scans')
        .insert({
          user_id: userId,
          image_url: imageUrl,
          analysis_result: analysisResult,
          risk_level: riskLevel
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  async getPlantingPlans(userId: string) {
    try {
      const { data, error } = await supabase
        .from('planting_plans')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching planting plans:', error);
      return [];
    }
  },

  async savePlantingPlan(userId: string, cropName: string, soilType: string, weatherCondition: string, planData: string) {
    try {
      const { data, error } = await supabase
        .from('planting_plans')
        .insert({
          user_id: userId,
          crop_name: cropName,
          soil_type: soilType,
          weather_condition: weatherCondition,
          plan_data: planData,
          status: 'Draft'
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  async updatePlantingPlanStatus(planId: string, userId: string, status: 'Draft' | 'Active' | 'Completed') {
    try {
      const { data, error } = await supabase
        .from('planting_plans')
        .update({ status })
        .eq('id', planId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }
};
