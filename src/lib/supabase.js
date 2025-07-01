import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database helper functions
export const dbHelpers = {
  // Get user profile
  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  // Create or update user profile
  async upsertProfile(profile) {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(profile)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Get user subscription
  async getSubscription(userId) {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  // Create subscription
  async createSubscription(subscription) {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert(subscription)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Get member card
  async getMemberCard(userId) {
    const { data, error } = await supabase
      .from('member_cards')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  // Create member card
  async createMemberCard(card) {
    const { data, error } = await supabase
      .from('member_cards')
      .insert(card)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Verify member by ID
  async verifyMember(memberId) {
    const { data, error } = await supabase
      .from('member_cards')
      .select(`
        *,
        profiles (
          full_name,
          avatar_url
        ),
        subscriptions (
          status,
          current_period_end
        )
      `)
      .eq('member_id', memberId)
      .single()
    
    if (error) throw error
    return data
  },

  // Get exclusive locations
  async getExclusiveLocations() {
    const { data, error } = await supabase
      .from('exclusive_locations')
      .select('*')
      .eq('active', true)
      .order('name')
    
    if (error) throw error
    return data
  }
}