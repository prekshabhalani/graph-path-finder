import { Injectable, Logger } from "@nestjs/common"

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name)
  private cache = new Map<string, { data: any; timestamp: number }>()
  private readonly DEFAULT_TTL = 5 * 60 * 1000 

  /**
   * Get a value from the cache
   * @param key Cache key
   * @returns Cached value or undefined if not found/expired
   */
  get<T>(key: string): T | undefined {
    const item = this.cache.get(key)

    if (!item) {
      return undefined
    }

    // Check if item has expired
    if (Date.now() > item.timestamp) {
      this.logger.debug(`Cache item expired: ${key}`)
      this.cache.delete(key)
      return undefined
    }

    return item.data as T
  }

  /**
   * Set a value in the cache
   * @param key Cache key
   * @param value Value to cache
   * @param ttl Time to live in milliseconds (default: 5 minutes)
   */
  set(key: string, value: any, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data: value,
      timestamp: Date.now() + ttl,
    })
    this.logger.debug(`Cached item: ${key} (expires in ${ttl}ms)`)
  }

  /**
   * Clear the entire cache
   */
  clear(): void {
    this.cache.clear()
    this.logger.debug("Cache cleared")
  }
}
