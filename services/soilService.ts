import { supabase } from './supabaseClient';
import { SoilData } from '../types';

interface SoilTest extends SoilData {
  id?: string;
  analysis_result?: string;
  created_at?: string;
}

export const soilService = {
  async saveSoilTest(userId: string, soilData: SoilData, analysisResult?: string) {
    try {
      const { data, error } = await supabase
        .from('soil_tests')
        .insert({
          user_id: userId,
          nitrogen: soilData.nitrogen,
          phosphorus: soilData.phosphorus,
          potassium: soilData.potassium,
          ph: soilData.ph,
          location: soilData.location,
          analysis_result: analysisResult
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  async getSoilTests(userId: string): Promise<SoilTest[]> {
    try {
      const { data, error } = await supabase
        .from('soil_tests')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching soil tests:', error);
      return [];
    }
  },

  async getLatestSoilTest(userId: string): Promise<SoilTest | null> {
    try {
      const { data, error } = await supabase
        .from('soil_tests')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data || null;
    } catch (error) {
      console.error('Error fetching latest soil test:', error);
      return null;
    }
  },

  async updateSoilTest(testId: string, userId: string, soilData: Partial<SoilData>, analysisResult?: string) {
    try {
      const { data, error } = await supabase
        .from('soil_tests')
        .update({
          ...(soilData.nitrogen !== undefined && { nitrogen: soilData.nitrogen }),
          ...(soilData.phosphorus !== undefined && { phosphorus: soilData.phosphorus }),
          ...(soilData.potassium !== undefined && { potassium: soilData.potassium }),
          ...(soilData.ph !== undefined && { ph: soilData.ph }),
          ...(soilData.location !== undefined && { location: soilData.location }),
          ...(analysisResult && { analysis_result: analysisResult })
        })
        .eq('id', testId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  async deleteSoilTest(testId: string, userId: string) {
    try {
      const { error } = await supabase
        .from('soil_tests')
        .delete()
        .eq('id', testId)
        .eq('user_id', userId);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  }
};
