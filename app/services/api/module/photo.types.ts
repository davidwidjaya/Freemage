import { ApiPaginationResponse } from "../api.types"

export interface ApiSearchPhotosRequest {
    query: string
    page?: number
    per_page?: number
    order_by?: string
}

export interface ApiFetchPhotoByIdRequest {
    id: number
}

export interface ApiFetchPhotosRequest {
    page?: number
    per_page?: number
    order_by?: number
}



export type ApiSearchPhotosResponse = ApiPaginationResponse<ApiSearchPhotosRowResponse>

export interface ApiSearchPhotosRowResponse {
    id: string
    created_at: string
    width: number
    height: number
    color: string
    blur_hash: string
    likes: number
    liked_by_user: boolean
    description: string
    user: {
        id: string
        username: string
        name: string
        first_name: string
        last_name: string
        instagram_username: string
        twitter_username: string
        portfolio_url: string
        profile_image: {
            small: string
            medium: string
            large: string
        }
        links: {
            self: string
            html: string
            photos: string
            likes: string
        }
    }
    current_user_collections: any[]
    urls: {
        raw: string
        full: string
        regular: string
        small: string
        thumb: string
    }
    links: {
        self: string
        html: string
        download: string
    }
}

export interface ApiFetchPhotoByIdResponse {
    id: string
    slug: string
    created_at: string
    updated_at: string
    promoted_at: any
    width: number
    height: number
    color: string
    blur_hash: string
    description: string
    alt_description: string
    urls: {
        raw: string
        full: string
        regular: string
        small: string
        thumb: string
        small_s3: string
    }
    links: {
        self: string
        html: string
        download: string
        download_location: string
    }
    likes: number
    liked_by_user: boolean
    current_user_collections: any[]
    sponsorship: {
        impression_urls: any[]
        tagline: string
        tagline_url: string
        sponsor: {
            id: string
            updated_at: string
            username: string
            name: string
            first_name: string
            last_name: any
            twitter_username: any
            portfolio_url: string
            bio: any
            location: any
            links: {
                self: string
                html: string
                photos: string
                likes: string
                portfolio: string
                following: string
                followers: string
            }
            profile_image: {
                small: string
                medium: string
                large: string
            }
            instagram_username: string
            total_collections: number
            total_likes: number
            total_photos: number
            accepted_tos: boolean
            for_hire: boolean
            social: {
                instagram_username: string
                portfolio_url: string
                twitter_username: any
                paypal_email: any
            }
        }
    }
    topic_submissions: any
    user: {
        id: string
        updated_at: string
        username: string
        name: string
        first_name: string
        last_name: any
        twitter_username: any
        portfolio_url: string
        bio: any
        location: any
        links: {
            self: string
            html: string
            photos: string
            likes: string
            portfolio: string
            following: string
            followers: string
        }
        profile_image: {
            small: string
            medium: string
            large: string
        }
        instagram_username: string
        total_collections: number
        total_likes: number
        total_photos: number
        accepted_tos: boolean
        for_hire: boolean
        social: {
            instagram_username: string
            portfolio_url: string
            twitter_username: any
            paypal_email: any
        }
    }
    exif: {
        make: string
        model: string
        name: string
        exposure_time: string
        aperture: any
        focal_length: any
        iso: number
    }
    location: {
        name: any
        city: any
        country: any
        position: {
            latitude: any
            longitude: any
        }
    }
    meta: {
        index: boolean
    }
    public_domain: boolean
    tags: {
        type: string
        title: string
        source?: {
            ancestry: {
                type: {
                    slug: string
                    pretty_slug: string
                }
                category: {
                    slug: string
                    pretty_slug: string
                }
                subcategory?: {
                    slug: string
                    pretty_slug: string
                }
            }
            title: string
            subtitle: string
            description: string
            meta_title: string
            meta_description: string
            cover_photo: {
                id: string
                slug: string
                created_at: string
                updated_at: string
                promoted_at?: string
                width: number
                height: number
                color: string
                blur_hash: string
                description?: string
                alt_description: string
                urls: {
                    raw: string
                    full: string
                    regular: string
                    small: string
                    thumb: string
                    small_s3: string
                }
                links: {
                    self: string
                    html: string
                    download: string
                    download_location: string
                }
                likes: number
                liked_by_user: boolean
                current_user_collections: any[]
                sponsorship: any
                topic_submissions: any
                premium: boolean
                plus: boolean
                user: {
                    id: string
                    updated_at: string
                    username: string
                    name: string
                    first_name: string
                    last_name: string
                    twitter_username?: string
                    portfolio_url?: string
                    bio?: string
                    location: string
                    links: {
                        self: string
                        html: string
                        photos: string
                        likes: string
                        portfolio: string
                        following: string
                        followers: string
                    }
                    profile_image: {
                        small: string
                        medium: string
                        large: string
                    }
                    instagram_username: string
                    total_collections: number
                    total_likes: number
                    total_photos: number
                    accepted_tos: boolean
                    for_hire: boolean
                    social: {
                        instagram_username: string
                        portfolio_url?: string
                        twitter_username?: string
                        paypal_email: any
                    }
                }
            }
        }
    }[]
    tags_preview: {
        type: string
        title: string
    }[]
    views: number
    downloads: number
    topics: any[]
    related_collections: {
        total: number
        type: string
        results: {
            id: string
            title: string
            description: any
            published_at: string
            last_collected_at: string
            updated_at: string
            curated: boolean
            featured: boolean
            total_photos: number
            private: boolean
            share_key: string
            tags: any
            links: any
            user: any
            cover_photo: any
            preview_photos: any
        }[]
    }
}

export interface ApiFetchPhotosResponse {
    id: string
    slug: string
    created_at: string
    updated_at: string
    promoted_at?: string
    width: number
    height: number
    color: string
    blur_hash: string
    description?: string
    alt_description: string
    urls: {
        raw: string
        full: string
        regular: string
        small: string
        thumb: string
        small_s3: string
    }
    links: {
        self: string
        html: string
        download: string
        download_location: string
    }
    likes: number
    liked_by_user: boolean
    current_user_collections: any[]
    sponsorship?: {
        impression_urls: string[]
        tagline: string
        tagline_url: string
        sponsor: {
            id: string
            updated_at: string
            username: string
            name: string
            first_name: string
            last_name?: string
            twitter_username?: string
            portfolio_url: string
            bio: string
            location: any
            links: {
                self: string
                html: string
                photos: string
                likes: string
                portfolio: string
                following: string
                followers: string
            }
            profile_image: {
                small: string
                medium: string
                large: string
            }
            instagram_username?: string
            total_collections: number
            total_likes: number
            total_photos: number
            accepted_tos: boolean
            for_hire: boolean
            social: {
                instagram_username?: string
                portfolio_url: string
                twitter_username?: string
                paypal_email: any
            }
        }
    }
    topic_submissions: {
        wallpapers?: {
            status: string
            approved_on: string
        }
    }
    user: {
        id: string
        updated_at: string
        username: string
        name: string
        first_name: string
        last_name?: string
        twitter_username?: string
        portfolio_url?: string
        bio?: string
        location?: string
        links: {
            self: string
            html: string
            photos: string
            likes: string
            portfolio: string
            following: string
            followers: string
        }
        profile_image: {
            small: string
            medium: string
            large: string
        }
        instagram_username?: string
        total_collections: number
        total_likes: number
        total_photos: number
        accepted_tos: boolean
        for_hire: boolean
        social: {
            instagram_username?: string
            portfolio_url?: string
            twitter_username?: string
            paypal_email: any
        }
    }
}