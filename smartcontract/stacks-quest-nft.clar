;; Stacks Quest Achievement NFT Contract
;; Awards unique NFTs for completing topics and becoming a Fortress Master

(impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)

;; Error codes
(define-constant ERR-NOT-AUTHORIZED (err u200))
(define-constant ERR-NOT-FOUND (err u201))
(define-constant ERR-ALREADY-MINTED (err u202))
(define-constant ERR-INVALID-TOPIC (err u203))

;; Contract owner
(define-data-var contract-owner principal tx-sender)

;; NFT token name and symbol
(define-non-fungible-token stacks-quest-achievement uint)

;; Last token ID
(define-data-var last-token-id uint u0)

;; Token metadata
(define-map token-metadata
  uint
  {
    owner: principal,
    achievement-type: (string-ascii 50),
    topic-id: uint,
    earned-at: uint,
    token-uri: (string-ascii 256)
  }
)

;; User achievements tracker
(define-map user-achievements
  principal
  {
    topic-badges: (list 15 uint),
    fortress-master-badge: (optional uint),
    total-badges: uint
  }
)

;; Achievement types
(define-constant ACHIEVEMENT-TOPIC-COMPLETE "TOPIC_COMPLETE")
(define-constant ACHIEVEMENT-FORTRESS-MASTER "FORTRESS_MASTER")

;; SIP-009 NFT trait implementation

(define-read-only (get-last-token-id)
  (ok (var-get last-token-id))
)

(define-read-only (get-token-uri (token-id uint))
  (ok (some (get token-uri (unwrap! (map-get? token-metadata token-id) (err ERR-NOT-FOUND)))))
)

(define-read-only (get-owner (token-id uint))
  (ok (nft-get-owner? stacks-quest-achievement token-id))
)

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) ERR-NOT-AUTHORIZED)
    (nft-transfer? stacks-quest-achievement token-id sender recipient)
  )
)

;; Custom read-only functions

(define-read-only (get-token-metadata (token-id uint))
  (map-get? token-metadata token-id)
)

(define-read-only (get-user-achievements (user principal))
  (default-to
    { topic-badges: (list), fortress-master-badge: none, total-badges: u0 }
    (map-get? user-achievements user)
  )
)

;; Check if user has earned topic badge
(define-read-only (has-topic-badge (user principal) (topic-id uint))
  (let ((achievements (get-user-achievements user)))
    (is-some (index-of (get topic-badges achievements) topic-id))
  )
)

;; Public functions

;; Mint topic completion badge
(define-public (mint-topic-badge (user principal) (topic-id uint))
  (let (
    (token-id (+ (var-get last-token-id) u1))
    (user-achv (get-user-achievements user))
  )
    ;; Validate
    (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-NOT-AUTHORIZED)
    (asserts! (and (>= topic-id u1) (<= topic-id u15)) ERR-INVALID-TOPIC)
    (asserts! (not (has-topic-badge user topic-id)) ERR-ALREADY-MINTED)
    
    ;; Mint NFT
    (try! (nft-mint? stacks-quest-achievement token-id user))
    
    ;; Set metadata
    (map-set token-metadata token-id {
      owner: user,
      achievement-type: ACHIEVEMENT-TOPIC-COMPLETE,
      topic-id: topic-id,
      earned-at: block-height,
      token-uri: (concat "ipfs://stacks-quest/topic-" (concat (int-to-ascii topic-id) ".json"))
    })
    
    ;; Update user achievements
    (map-set user-achievements user {
      topic-badges: (unwrap-panic (as-max-len? (append (get topic-badges user-achv) topic-id) u15)),
      fortress-master-badge: (get fortress-master-badge user-achv),
      total-badges: (+ (get total-badges user-achv) u1)
    })
    
    ;; Update last token ID
    (var-set last-token-id token-id)
    
    (ok token-id)
  )
)

;; Mint Fortress Master badge (all 15 topics completed)
(define-public (mint-fortress-master-badge (user principal))
  (let (
    (token-id (+ (var-get last-token-id) u1))
    (user-achv (get-user-achievements user))
  )
    ;; Validate
    (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-NOT-AUTHORIZED)
    (asserts! (is-none (get fortress-master-badge user-achv)) ERR-ALREADY-MINTED)
    (asserts! (is-eq (len (get topic-badges user-achv)) u15) ERR-NOT-AUTHORIZED)
    
    ;; Mint NFT
    (try! (nft-mint? stacks-quest-achievement token-id user))
    
    ;; Set metadata
    (map-set token-metadata token-id {
      owner: user,
      achievement-type: ACHIEVEMENT-FORTRESS-MASTER,
      topic-id: u0,
      earned-at: block-height,
      token-uri: "ipfs://stacks-quest/fortress-master.json"
    })
    
    ;; Update user achievements
    (map-set user-achievements user {
      topic-badges: (get topic-badges user-achv),
      fortress-master-badge: (some token-id),
      total-badges: (+ (get total-badges user-achv) u1)
    })
    
    ;; Update last token ID
    (var-set last-token-id token-id)
    
    (ok token-id)
  )
)

;; Admin: Update contract owner
(define-public (set-contract-owner (new-owner principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-NOT-AUTHORIZED)
    (var-set contract-owner new-owner)
    (ok true)
  )
)

;; Helper function to convert uint to ascii (simplified)
(define-private (int-to-ascii (value uint))
  (if (<= value u9)
    (unwrap-panic (element-at "0123456789" value))
    "0" ;; Simplified for demo
  )
)
